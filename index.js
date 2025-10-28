import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-ef246-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database, "leads");

const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
        const values = snapshot.val();
        const leads = Object.values(values);
        render(leads);
    }
});

deleteBtn.addEventListener("dblclick", function () {
    remove(dbRef);
    ulEl.innerHTML = "";
});

inputBtn.addEventListener("click", function () {
    push(dbRef, inputEl.value);
    inputEl.value = "";
});

inputEl.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") {
        push(dbRef, inputEl.value);
        inputEl.value = "";
    }
});
