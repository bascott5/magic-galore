"use strict";

document.addEventListener('alpine:init', () => {
    Alpine.data('upload', () => ({
        jsonContainer: document.getElementsByClassName("json-container"),
        jsonFiles: [],

        fileChange: {
            ['@change'](e) {
                this.jsonFiles.push(e.target.files[0]);
            },
        },

        clickFile: {
            ['@click']() {
                this.jsonFiles.splice(this.$el.id, 1);
            }
        }
    }));

    Alpine.data('products', () => ({
        addRow: {
            ['@click']() {
                let tr = document.createElement("tr");
                let td = document.createElement("td");

                for (let i = 0; i < 6; i++) {
                    tr.appendChild(td);
                    td = document.createElement("td");
                }

                let editButton = document.createElement("button");
                editButton.textContent = "Edit";
                td.appendChild(editButton);

                tr.appendChild(td);
                td = document.createElement("td");

                let deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                td.appendChild(deleteButton);

                tr.appendChild(td);
                td = document.createElement("td");

                this.$data.$el.children[0].children[0].appendChild(tr);
            }
        }
    }));
});