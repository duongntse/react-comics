/* eslint-disable prefer-template */
/* eslint-disable import/prefer-default-export */
import fetch from "isomorphic-fetch";
class Client {
    constructor() {
        this.items = [];
        this.betaItems = [];
        this.loadStatus = "INIT"; // INIT, IN_PROGRESS, COMPLETED
    }

    loadItems() {
        this.loadStatus = "IN_PROGRESS";
        console.log("Called loadItems()");
        return new Promise((resolve, reject) => {
            try {
                fetch("items.json", {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                })
                    .then(this.checkStatus)
                    .then(this.parseJson)
                    .then((myJson) => {
                        this.loadStatus = "COMPLETED";
                        this.betaItems = myJson;
                        debugger;
                        resolve(myJson);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            const error = new Error(`HTTP Error ${response.statusText}`);
            error.status = response.statusText;
            error.response = response;
            console.log(error);
            throw error;
        }
    }

    parseJson(response) {
        return response.json();
    }
}

export const client = new Client();
