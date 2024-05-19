// ////////////////////////////////////////////////////////////////////////////////////////
// js code for burger menu to add style overflow hidden to body
let burger = document.querySelectorAll(".hamburger");
// const toggleOverflow = () => {
//   // let myBody = document.getElementsByTagName('body')[0]
//   // myBody.classList.toggle('ovh')
// };
// ////////////////////////////////////////////////////////////
// Closing of Hamburger
// const deleteBurgerMenu = () => {
//   // let myBody = document.getElementsByTagName('body')[0]
//   toggle.checked = false;
//   // myBody.classList.remove('ovh')
// };
// function deleteBurgerMenu() {
//   console.log("deleteBurgerMenu");
//   // Получаем чекбокс по его id
//   var checkbox = document.getElementById("toggle");
//   // Проверяем, активен ли чекбокс
//   if (checkbox.checked) {
//       // Если да, меняем его состояние на неактивное
//       checkbox.checked = false;
//   }
// }


///////   Terms and Conditions section
const checkbox = document.getElementById("terms-checkbox");
const button = document.getElementById("terms");
const termsContainer = document.querySelector(".terms-container");

termsContainer.style.bottom = "0";

checkbox.addEventListener("change", function () {
  button.disabled = !this.checked;
});

button.addEventListener("click", function () {
  if (checkbox.checked) {
    termsContainer.style.bottom = "-100%";
  }
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  child,
  get,
  getDatabase,
  ref,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtK9BZ9Ig-1oJwpXT93388eT5FFEAs24o",
  authDomain: "lazysubtest.firebaseapp.com",
  projectId: "lazysubtest",
  storageBucket: "lazysubtest.appspot.com",
  messagingSenderId: "20632708799",
  appId: "1:20632708799:web:73805f9d71d484eecc080a",
  databaseURL:
    "https://lazysubtest-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
// Function to add data to the database
async function addToDatabase(data) {
  try {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `/`))
      .then((snapshot) => {
        const dataDB = snapshot.val();
        const count = dataDB.Popups.Blue + dataDB.Popups.Yellow + 1;
        set(ref(db, `/Users/${count}`), data.email);
        const updates = {};
        if (data.popupId === "popup1") {
          updates["/Popups/Blue/"] = dataDB.Popups.Blue + 1;
        }
        if (data.popupId === "popup2") {
          updates["/Popups/Yellow/"] = dataDB.Popups.Yellow + 1;
        }
        return update(ref(db), updates);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// POP-UP section
let popups = [
  document.getElementById("popup1"),
  document.getElementById("popup2"),
];
let emails = [
  document.getElementById("email1"),
  document.getElementById("email2"),
];
let closeBtns = document.getElementsByClassName("popup-close");
let popupContainer = document.getElementById("popup-container");

// Проверяем, отправлял ли пользователь уже email и не нажимал крестик
if (
  !localStorage.getItem("emailSubmitted") &&
  !localStorage.getItem("emailRejected")
) {
  setTimeout(function () {
    let randomIndex = Math.floor(Math.random() * popups.length);
    popupContainer.style.display = "flex";
    popups[randomIndex].style.display = "flex";
    document.documentElement.classList.add("popup-open");
  }, 5000); // Время в миллисекундах до появления всплывающего окна.
}

// Проверяем, отправлял ли пользователь уже email и нажимад крестик
if (
  !localStorage.getItem("emailSubmitted") &&
  localStorage.getItem("emailRejected")
) {
  setTimeout(function () {
    let randomIndex = Math.floor(Math.random() * popups.length);
    popupContainer.style.display = "flex";
    popups[randomIndex].style.display = "flex";
    document.documentElement.classList.add("popup-open");
  }, 60000); // Время в миллисекундах до появления всплывающего окна.
}

// Closing popup
for (let i = 0; i < closeBtns.length; i++) {
  closeBtns[i].onclick = function () {
    for (let j = 0; j < popups.length; j++) {
      popups[j].style.display = "none";
      popupContainer.style.display = "none";
      localStorage.setItem("emailRejected", "true");
      confirmationPopup.style.display = "none";
      document.documentElement.classList.remove("popup-open");
    }
  };
}

// Функция отображения окна с сообщением о принятии почты для бета-тестирования
function showConfirmationPopup() {
  // Прокрутка страницы в самый верх
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  const confirmationPopup = document.getElementById("confirmationPopup");
  confirmationPopup.style.display = "flex";
}

for (let i = 0; i < emails.length; i++) {
  emails[i].onchange = function (e) {
    let popupId = e.target.id === "email1" ? "popup1" : "popup2";
    let email = e.target.value;
    addToDatabase({
      email: email,
      popupId: popupId,
    });
    // Сохраняем информацию о том, что пользователь отправил email.
    localStorage.setItem("emailSubmitted", "true");

    // Отображаем окно с сообщением о принятии почты для бета-тестирования
    showConfirmationPopup();
    for (let j = 0; j < popups.length; j++) {
      popups[j].style.display = "none";
    }
  };
}

// Function to get Twits
async function getTwits() {
  try {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `/Twits`))
      .then((snapshot) => {
        const dataDB = snapshot.val();
        const twits = dataDB;
        const twitsContainer = document.getElementById("twits");
        // const twitsWrapper = document.getElementById("twits-container");

        for (let i = 0; i < twits.length; i++) {
          if (twits[i]) {
            const twitDiv = document.createElement("div");
            twitDiv.innerHTML = twits[i];
            twitsContainer.appendChild(twitDiv);
          }
        }
        // Добавление свойства justify-content: center; к .twits-container
        if (twits.length < 3) {
          twitsContainer.style.justifyContent = "center";
        }
        // Активация виджета Twitter
        if (typeof twttr !== "undefined") {
          twttr.widgets.load();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
getTwits();

///////////////////////////////////ROADMAP/////////////////////////////
// Ваши JSON-данные
var jsonData = [
  // {
  //   index: 1,
  //   title: "Project Initiation",
  //   date: "December 2021",
  //   imageSrc: "./img/roadmap/i.svg",
  //   description:
  //     "The birth of the idea, the creation of Twitter and Discord accounts.",
  //   future: false,
  //   current: false,
  // },
  {
    index: 2,
    title: "Website Release & LSS Art First Version",
    date: "January 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Release of the first version of the game website, as well as starting the development of the first version of the art for the game NFT collection, Lazy Soccer Staff, with football teams’ staff characters.",
    future: false,
    current: false,
  },
  {
    index: 3,
    title: "Initial Investment",
    date: "January 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Initial investment gathered from FFF - mainly members of the founder’s existing crypto community.",
    future: false,
    current: false,
  },
  {
    index: 4,
    title: "Lazy Alpha Collection Development",
    date: "February 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Development of the concept of the Lazy Alpha genesis NFT collection, which is the main utilitarian collection of the project, and preparation for its launch.",
    future: false,
    current: false,
  },
  {
    index: 7,
    title: "GDD Development",
    date: "June 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Start working on the Lazy Soccer game design, which resulted in a 210-page Game Design Document (GDD).",
    future: false,
    current: false,
  },
  {
    index: 6,
    title: "Lazy Alpha Collection Mint",
    date: "May 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Mint of the Lazy Alpha genesis NFT collection, creation of a private community on its basis.",
    future: false,
    current: false,
  },
  {
    index: 5,
    title: "Pause Caused by the War",
    date: "February 2022 - April 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "The Lazy Soccer project team, which includes citizens of Ukraine, Russia, and Belarus, categorically condemns the war of Russia against Ukraine. Since some members of the team and their families, as well as most of the 'early adopters' of the project, were affected by the war to one degree or another, the start of the development of the project was postponed to a later date.",
    future: false,
    current: false,
  },
  {
    index: 8,
    title: "Start of Game Development",
    date: "July 2022",
    imageSrc: "./img/roadmap/i.svg",
    description: "Start developing a game app in Unity.",
    future: false,
    current: false,
  },
  {
    index: 9,
    title: "Lazy Family (ex Dust City) Collection Mint",
    date: "October 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Mint of the Lazy Family community collection to attract a new audience to the project.",
    future: false,
    current: false,
  },
  {
    index: 10,
    title: "LSS Art Second Version",
    date: "November 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Development of the second version of the art for the Lazy Soccer Staff game NFT collection.",
    future: false,
    current: false,
  },
  {
    index: 13,
    title: "Whitepaper Release",
    date: "January 2023",
    imageSrc: "./img/roadmap/i.svg",
    description: "Release of the first whitepaper version.",
    future: false,
    current: false,
  },
  {
    index: 12,
    title: "LSS Art Final Version",
    date: "December 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Start working on the third, final version of the art for the Lazy Soccer Staff game NFT collection.",
    future: false,
    current: false,
  },
  {
    index: 11,
    title: "Match Simulator Development",
    date: "November 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Start working on a match simulator based on football logic and tactics.",
    future: false,
    current: false,
  },
  {
    index: 14,
    title: "Launch of Quests",
    date: "January 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Starting a Zealy quest program, the most active participants of which receive valuable gaming boosters when the game is released.",
    future: false,
    current: false,
  },
  {
    index: 15,
    title: "Tokens Usage Idea Rejection",
    date: "February 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Abandonment of initial plans to use fungible tokens in the game due to awareness of high risks and corresponding whitepaper update.",
    future: false,
    current: false,
  },
  {
    index: 16,
    title: "Lazy Soccer Twitter Spaces Launch",
    date: "February 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "The first Lazy Soccer Twitter Spaces, which later evolved into Lazy Spaces and were held weekly from March to August 2023, after which it was decided to reduce the frequency of Twitter Spaces to bi-weekly events.",
    future: false,
    current: false,
  },
  {
    index: 19,
    title: "LSS Art Approvement",
    date: "April 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Completion of work on the final version of the Lazy Soccer Staff game NFT collection and preparation for the mint.",
    future: false,
    current: false,
  },
  {
    index: 18,
    title: "LSS Presale",
    date: "April 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Presale of the Lazy Soccer Staff game collection, which resulted in private investors (FFF) purchasing 68% with a total supply of 10,000 NFT and a presale price of $25-25.5.",
    future: false,
    current: false,
  },
  {
    index: 17,
    title: "First Gaming Contracts Deployment",
    date: "March 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Deployment of the first gaming contracts on the Polygon Mumbai testnet.",
    future: false,
    current: false,
  },
  {
    index: 20,
    title: "Bridge Development",
    date: "May 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Deployment of our own bridge on the Polygon Mumbai testnet to transfer the Lazy Alpha genesis NFT collection from the Solana network.",
    future: false,
    current: false,
  },
  {
    index: 21,
    title: "LSS Mint Postponement",
    date: "May 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Postponement of the Lazy Soccer Staff mint due to unsatisfactory market conditions and other negative factors to a later period but not earlier than the game's open beta release.",
    future: false,
    current: false,
  },
  {
    index: 22,
    title: "Trailer & Game Presentation at 3XP Convention, LA",
    date: "June 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Release of the first version of the game’s 3D trailer, including gameplay elements, presentation of the trailer at the Lazy Soccer booth at the 3XP Web3 gaming convention in Los Angeles.",
    future: false,
    current: false,
  },
  {
    index: 25,
    title: "OG Badges Mint",
    date: "April 2024",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "OG Badges were issued as community rewards to active participants in the Closed Beta Test. These badges were minted free of charge and were facilitated through a collaboration with Earn Alliance.",
    future: false,
    current: false,
  },
  {
    index: 24,
    title: "Closed Beta Launch",
    date: "Q3 2023",
    imageSrc: "./img/roadmap/i.svg",
    description: "Launch of closed beta testing among community members.",
    future: false,
    current: false,
  },
  {
    index: 23,
    title: "Closed Beta Preparation",
    date: "September 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Preparation for closed beta testing of the Android and iOS versions of the game.",
    future: false,
    current: false,
  },
  {
    index: 26,
    title: "Open Beta Test Release",
    date: "April 2024",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Launch of Open Beta Testing phase for both iOS and Android platforms, welcoming all interested users to participate. Regular updates and support will be offered throughout the testing period to ensure a steady improvement based on user input.",
    future: false,
    current: false,
  },
  {
    index: 27,
    title: "Open Beta Tournaments",
    date: "May 2024",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Two in-game seasons of competitive tournaments during the Open Beta phase, open to all participants, will exciting prizes for top performers.",
    future: false,
    current: true,
  },
  {
    index: 27,
    title: "Mainnet Launch",
    date: "June 2024",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Transition from testing to a fully operational network, ensuring stability and scalability for all users.",
    future: true,
    current: false,
  },
  {
    index: 29,
    title: "Football Influencers & Players Attraction",
    date: "Q4 2024",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Collaborating with popular football influencers and professional players to boost credibility and promote Lazy Soccer and enhance user engagement.",
    future: true,
    current: false,
  },
  {
    index: 28,
    title: "Lazy Soccer WebGL Release",
    date: "Q3 2024",
    imageSrc: "./img/roadmap/i.svg",
    description: "Release of a web version of Lazy Soccer game",
    future: true,
    current: false,
  },
  {
    index: 27,
    title: "Active Marketing Campaigns",
    date: "Q3 2024",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Increasing brand awareness and user engagement through targeted advertising, social media outreach, and strategic partnerships to reach a broader audience and drive adoption of Lazy Soccer.",
    future: true,
    current: false,
  },
  {
    index: 31,
    title: "Lazy Brand Growth",
    date: "2024",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Expanding the Lazy brand presence and increasing brand recognition to solidify our position in the market.",
    future: true,
    current: false,
  },
  {
    index: 30,
    title: "3D Game Visualization",
    date: "2025",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Ability to view your matches featuring sloths in a more immersive and realistic format. Players will be represented as full 3D models moving across the field and interacting with the ball, significantly enhancing visual experience and engagement.",
    future: true,
    current: false,
  },
  {
    index: 32,
    title: "AI Game Simulator",
    date: "2026",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "We aim to revolutionize gameplay by applying statistical analysis of real football players movements on the field. It will dynamically simulate players' actions based on their position, strength, and other in-game metrics, creating an experience that closely mirrors real-life football dynamics.",
    future: true,
    current: false,
  },
  {

  },
  {
 
  },
  {
    index: 33,
    title: "Football School & Team Creation",
    date: "",
    imageSrc: "./img/roadmap/i.svg",
    description:
      false,
    future: true,
    current: false,
  },
];

// Получите ссылку на контейнер .new-wrapper
var container = document.querySelector(".new-wrapper");

// Пройдитесь по JSON-данным и создайте блоки для каждого элемента
jsonData.forEach(function (item) {
  // Создайте элемент .roadmap_content_wrapper
  var contentWrapper = document.createElement("div");
  contentWrapper.className = "roadmap_content_wrapper";

  // Создайте элементы для заголовка и даты
  var titleElement = document.createElement("p");
  if (item.future) {
    titleElement.className = "roadap_content_title roadap_content_title_future";
  } else {
    titleElement.className = "roadap_content_title";
  }
  if (item.current) {
    titleElement.className += " roadmap_current_event";
  }
  titleElement.textContent = item.title;

  var dateElement = document.createElement("p");
  dateElement.className = "roadap_content_data";
  dateElement.textContent = item.date;

  // Добавьте элементы к .roadmap_content_wrapper
  contentWrapper.appendChild(titleElement);
  contentWrapper.appendChild(dateElement);

  // Проверьте наличие описания, прежде чем создавать элементы изображения и описания
  if (item.description) {
    var imageElement = document.createElement("img");
    imageElement.className = "roadmap_content_i";
    imageElement.src = item.imageSrc;
    imageElement.alt = "";

    var descriptionElement = document.createElement("div");
    descriptionElement.className = "roadmap_content_i_description";
    descriptionElement.textContent = item.description;

    // Добавьте элементы изображения и описания к .roadmap_content_wrapper
    contentWrapper.appendChild(imageElement);
    contentWrapper.appendChild(descriptionElement);
  }

  // Добавьте .roadmap_content_wrapper к .new-wrapper
  container.appendChild(contentWrapper);
});


// Mobile roadmap
var jsonDataMobile = [
  {
    index: 1,
    title: "Project Initiation",
    date: "December 2021",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "The birth of the idea, the creation of Twitter and Discord accounts.",
    future: false,
    current: false,
  },
  {
    index: 2,
    title: "Website Release & LSS Art First Version",
    date: "January 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Release of the first version of the game website, as well as starting the development of the first version of the art for the game NFT collection, Lazy Soccer Staff, with football teams’ staff characters.",
    future: false,
    current: false,
  },
  {
    index: 3,
    title: "Initial Investment",
    date: "January 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Initial investment gathered from FFF - mainly members of the founder’s existing crypto community.",
    future: false,
    current: false,
  },
  {
    index: 4,
    title: "Lazy Alpha Collection Development",
    date: "February 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Development of the concept of the Lazy Alpha genesis NFT collection, which is the main utilitarian collection of the project, and preparation for its launch.",
    future: false,
    current: false,
  },
  {
    index: 5,
    title: "Pause Caused by the War",
    date: "February 2022 - April 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "The Lazy Soccer project team, which includes citizens of Ukraine, Russia, and Belarus, categorically condemns the war of Russia against Ukraine. Since some members of the team and their families, as well as most of the 'early adopters' of the project, were affected by the war to one degree or another, the start of the development of the project was postponed to a later date.",
    future: false,
    current: false,
  },
  {
    index: 6,
    title: "Lazy Alpha Collection Mint",
    date: "May 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Mint of the Lazy Alpha genesis NFT collection, creation of a private community on its basis.",
    future: false,
    current: false,
  },
  {
    index: 7,
    title: "GDD Development",
    date: "June 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Start working on the Lazy Soccer game design, which resulted in a 210-page Game Design Document (GDD).",
    future: false,
    current: false,
  },
  {
    index: 8,
    title: "Start of Game Development",
    date: "July 2022",
    imageSrc: "./img/roadmap/i.svg",
    description: "Start developing a game app in Unity.",
    future: false,
    current: false,
  },
  {
    index: 9,
    title: "Lazy Family (ex Dust City) Collection Mint",
    date: "October 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Mint of the Lazy Family community collection to attract a new audience to the project.",
    future: false,
    current: false,
  },
  {
    index: 10,
    title: "LSS Art Second Version",
    date: "November 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Development of the second version of the art for the Lazy Soccer Staff game NFT collection.",
    future: false,
    current: false,
  },
  {
    index: 11,
    title: "Match Simulator Development",
    date: "November 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Start working on a match simulator based on football logic and tactics.",
    future: false,
    current: false,
  },
  {
    index: 12,
    title: "LSS Art Final Version",
    date: "December 2022",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Start working on the third, final version of the art for the Lazy Soccer Staff game NFT collection.",
    future: false,
    current: false,
  },
  {
    index: 13,
    title: "Whitepaper Release",
    date: "January 2023",
    imageSrc: "./img/roadmap/i.svg",
    description: "Release of the first whitepaper version.",
    future: false,
    current: false,
  },
  {
    index: 14,
    title: "Launch of Quests",
    date: "January 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Starting a Zealy quest program, the most active participants of which receive valuable gaming boosters when the game is released.",
    future: false,
    current: false,
  },
  {
    index: 15,
    title: "Tokens Usage Idea Rejection",
    date: "February 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Abandonment of initial plans to use fungible tokens in the game due to awareness of high risks and corresponding whitepaper update.",
    future: false,
    current: false,
  },
  {
    index: 16,
    title: "Lazy Soccer Twitter Spaces Launch",
    date: "February 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "The first Lazy Soccer Twitter Spaces, which later evolved into Lazy Spaces and were held weekly from March to August 2023, after which it was decided to reduce the frequency of Twitter Spaces to bi-weekly events.",
    future: false,
    current: false,
  },
  {
    index: 17,
    title: "First Gaming Contracts Deployment",
    date: "March 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Deployment of the first gaming contracts on the Polygon Mumbai testnet.",
    future: false,
    current: false,
  },
  {
    index: 18,
    title: "LSS Presale",
    date: "April 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Presale of the Lazy Soccer Staff game collection, which resulted in private investors (FFF) purchasing 68% with a total supply of 10,000 NFT and a presale price of $25-25.5.",
    future: false,
    current: false,
  },
  {
    index: 19,
    title: "LSS Art Approvement",
    date: "April 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Completion of work on the final version of the Lazy Soccer Staff game NFT collection and preparation for the mint.",
    future: false,
    current: false,
  },
  {
    index: 20,
    title: "Bridge Development",
    date: "May 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Deployment of our own bridge on the Polygon Mumbai testnet to transfer the Lazy Alpha genesis NFT collection from the Solana network.",
    future: false,
    current: false,
  },
  {
    index: 21,
    title: "LSS Mint Postponement",
    date: "May 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Postponement of the Lazy Soccer Staff mint due to unsatisfactory market conditions and other negative factors to a later period but not earlier than the game's open beta release.",
    future: false,
    current: false,
  },
  {
    index: 22,
    title: "Trailer & Game Presentation at 3XP Convention, LA",
    date: "June 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Release of the first version of the game’s 3D trailer, including gameplay elements, presentation of the trailer at the Lazy Soccer booth at the 3XP Web3 gaming convention in Los Angeles.",
    future: false,
    current: false,
  },
  {
    index: 23,
    title: "Closed Beta Preparation",
    date: "September 2023",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Preparation for closed beta testing of the Android and iOS versions of the game.",
    future: false,
    current: false,
  },
  {
    index: 24,
    title: "Closed Beta Launch",
    date: "Q3 2023",
    imageSrc: "./img/roadmap/i.svg",
    description: "Launch of closed beta testing among community members.",
    future: false,
    current: false,
  },
  {
    index: 25,
    title: "OG Badges Mint",
    date: "April 2024",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "OG Badges were issued as community rewards to active participants in the Closed Beta Test. These badges were minted free of charge and were facilitated through a collaboration with Earn Alliance.",
    future: false,
    current: false,
  },
  {
    index: 25,
    title: "Open Beta Test Release",
    date: "April 2024",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Launch of Open Beta Testing phase for both iOS and Android platforms, welcoming all interested users to participate. Regular updates and support will be offered throughout the testing period to ensure a steady improvement based on user input.",
    future: false,
    current: false,
  },
  {
    index: 27,
    title: "Open Beta Tournaments",
    date: "May 2024",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Two in-game seasons of competitive tournaments during the Open Beta phase, open to all participants, will exciting prizes for top performers.",
    future: false,
    current: true,
  },
  {
    index: 27,
    title: "Mainnet Launch",
    date: "June 2024",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Transition from testing to a fully operational network, ensuring stability and scalability for all users.",
    future: true,
    current: false,
  },
  {
    index: 28,
    title: "Active Marketing Campaigns",
    date: "Q3 2024",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Increasing brand awareness and user engagement through targeted advertising, social media outreach, and strategic partnerships to reach a broader audience and drive adoption of Lazy Soccer.",
    future: true,
    current: false,
  },
  {
    index: 26,
    title: "Lazy Soccer WebGL Release",
    date: "Q3 2024",
    imageSrc: "./img/roadmap/i.svg",
    description: "Release of a web version of Lazy Soccer game",
    future: true,
    current: false,
  },
  {
    index: 29,
    title: "Football Influencers & Players Attraction",
    date: "Q4 2024",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Collaborating with popular football influencers and professional players to boost credibility and promote Lazy Soccer and enhance user engagement.",
    future: true,
    current: false,
  },
  {
    index: 30,
    title: "3D Game Visualization",
    date: "2025",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Ability to view your matches featuring sloths in a more immersive and realistic format. Players will be represented as full 3D models moving across the field and interacting with the ball, significantly enhancing visual experience and engagement.",
    future: true,
    current: false,
  },
  {
    index: 31,
    title: "Lazy Brand Growth",
    date: "2024",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "Expanding the Lazy brand presence and increasing brand recognition to solidify our position in the market.",
    future: true,
    current: false,
  },
  {
    index: 32,
    title: "AI Game Simulator",
    date: "2026",
    imageSrc: "./img/roadmap/i.svg",
    description:
      "We aim to revolutionize gameplay by applying statistical analysis of real football players movements on the field. It will dynamically simulate players' actions based on their position, strength, and other in-game metrics, creating an experience that closely mirrors real-life football dynamics.",
    future: true,
    current: false,
  },
  {
    index: 33,
    title: "Football School & Team Creation",
    date: "",
    imageSrc: "./img/roadmap/i.svg",
    description:
      false,
    future: true,
    current: false,
  },

];

// Получаем ссылку на контейнер .new-wrapper
var mobileContainer = document.querySelector(".roadmap_mobile_wrapper"); // Добавляем ссылку на контейнер для мобильной версии

// Проходим по отсортированным данным и создаем блоки для каждого элемента
jsonDataMobile.forEach(function (item) {
  // Создайте элемент .roadmap_content_wrapper
  var contentWrapper = document.createElement("div");
  contentWrapper.className = "roadmap_mobile_content_container";

  // Создайте элементы для заголовка и даты
  var titleElement = document.createElement("p");
  if (item.future) {
    titleElement.className =
      "roadmap_mobile_content_title roadmap_mobile_content_title_future";
  } else {
    titleElement.className = "roadmap_mobile_content_title";
  }
  if (item.current) {
    titleElement.className += " roadmap_current_event";
  }
  titleElement.textContent = item.title;

  var dateElement = document.createElement("p");
  dateElement.className = "roadmap_mobile_content_data";
  dateElement.textContent = item.date;

  // Добавьте элементы заголовка и даты к .roadmap_content_wrapper
  contentWrapper.appendChild(titleElement);
  contentWrapper.appendChild(dateElement);

  // Проверьте наличие описания, прежде чем создавать элемент описания
  if (item.description) {
    var descriptionElement = document.createElement("div");
    descriptionElement.className = "roadmap_mobile_content_description";
    descriptionElement.textContent = item.description;

    // Добавьте элемент описания к .roadmap_content_wrapper
    contentWrapper.appendChild(descriptionElement);
  }

  // Добавьте .roadmap_content_wrapper к .roadmap_mobile_wrapper
  mobileContainer.appendChild(contentWrapper);

  // Проверьте наличие элемента с current: true
  if (item.current) {
    contentWrapper.classList.add('current-item');
  }
});

// Прокрутите до элемента с current: true внутри контейнера
var currentItem = document.querySelector('.roadmap_mobile_wrapper .current-item');
if (currentItem) {
  var container = document.querySelector('.roadmap_content_container_mobile');
  container.scrollTo({
    left: currentItem.offsetLeft - container.offsetLeft - 100,
    behavior: 'smooth'
  });
}

// Получаем элемент, который содержит прокручиваемую область
var myDiv = document.querySelector('.roadmap_content_container_mobile');

// Устанавливаем временное значение 'auto' для -webkit-overflow-scrolling
myDiv.style.webkitOverflowScrolling = 'auto';

// Функция для переключения обратно на 'touch'
function enableSmoothScrolling() {
    myDiv.style.webkitOverflowScrolling = 'touch';
}

// Устанавливаем таймаут для вызова функции через 500 миллисекунд
setTimeout(enableSmoothScrolling, 1000);


