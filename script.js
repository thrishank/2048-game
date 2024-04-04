const allboxes = Array.from(document.querySelectorAll(".box"));
const score = document.getElementById("score");
let total_score = 4;

function add(postion, value) {
  allboxes[postion].textContent = value;
  allboxes[postion].classList.replace("false", "true");
  allboxes[postion].classList.add("x" + value);
}

function remove(postion, value) {
  allboxes[postion].textContent = "";
  allboxes[postion].classList.replace("true", "false");
  allboxes[postion].classList.remove("x" + value);
}

function NewGame() {
  let random1 = Math.round(Math.random() * 14);
  let random2 = Math.round(Math.random() * 14);

  while (random2 === random1) {
    random2 = Math.round(Math.random() * 14);
  }

  allboxes.map((i) => {
    remove(i.id, i.textContent);
  });

  add(random1, 2);
  add(random2, 2);
  total_score = 4;
  score.innerHTML = total_score;
}

NewGame();

const btn = document.getElementsByTagName("button");
btn[0].addEventListener("click", NewGame);

function add_random() {
  const EmptyBox = Array.from(document.querySelectorAll(".false"));
  const pos = Math.round(Math.random() * EmptyBox.length - 1);
  const random_box = EmptyBox[pos];
  if (random_box) {
    random_box.classList.replace("false", "true");
    random_box.classList.add("x2");
    random_box.textContent = 2;
    total_score += 2;
  }
}

function moveLeft() {
  let value_boxes = Array.from(document.querySelectorAll(".true"));

  value_boxes.forEach((element) => {
    let pos = Number.parseInt(element.id);
    let rem = pos % 4;

    while (rem != 0) {
      if (
        allboxes[pos - 1].classList.contains("true") &&
        allboxes[pos - 1].textContent != allboxes[pos].textContent
      ) {
        break;
      }

      if (allboxes[pos - rem].classList.contains("false")) {
        let value = Number.parseInt(allboxes[pos].textContent);
        remove(pos, value);
        pos = pos - rem;
        add(pos, value);
        break;
      }

      if (allboxes[pos - rem].textContent === allboxes[pos].textContent) {
        let value = Number.parseInt(allboxes[pos].textContent);
        remove(pos, value);
        pos = pos - rem;
        remove(pos, value);
        add(pos, value * 2);
        break;
      }
      rem--;
    }
    value_boxes = document.querySelectorAll(".true");
  });

  add_random();
}

function moveRight() {
  let value_boxes = Array.from(document.querySelectorAll(".true"));
  value_boxes.reverse();

  value_boxes.forEach((element) => {
    let pos = Number.parseInt(element.id);
    let rem = pos % 4;

    while (rem != 3) {
      if (
        allboxes[pos + 1].classList.contains("true") &&
        allboxes[pos + 1].textContent != allboxes[pos].textContent
      ) {
        break;
      }

      if (allboxes[pos + 3 - rem].classList.contains("false")) {
        let value = Number.parseInt(allboxes[pos].textContent);
        remove(pos, value);
        pos = pos + 3 - rem;
        add(pos, value);
        break;
      }

      if (
        allboxes[pos + 3 - rem].classList.contains("true") &&
        allboxes[pos + 3 - rem].textContent === allboxes[pos].textContent
      ) {
        let value = Number.parseInt(allboxes[pos].textContent);
        remove(pos, value);
        pos = pos + 3 - rem;
        remove(pos, value);
        add(pos, value * 2);
        break;
      }
      rem++;
    }
    value_boxes = Array.from(document.querySelectorAll(".true"));
    value_boxes.reverse();
  });
  add_random();
}

function moveUp() {
  let value_boxes = Array.from(document.querySelectorAll(".true"));
  value_boxes.reverse();

  value_boxes.forEach((element) => {
    let pos = Number.parseInt(element.id);
    let rem = pos % 4;

    while (pos != rem) {
      if (
        allboxes[pos - 4].classList.contains("true") &&
        allboxes[pos].textContent != allboxes[pos - 4].textContent
      ) {
        break;
      }

      if (allboxes[rem].classList.contains("false")) {
        let value = Number.parseInt(allboxes[pos].textContent);
        remove(pos, value);
        pos = rem;
        add(pos, value);
        break;
      }

      if (
        allboxes[rem].classList.contains("true") &&
        allboxes[rem].textContent === allboxes[pos].textContent
      ) {
        let value = Number.parseInt(allboxes[pos].textContent);
        remove(pos, value);
        pos = rem;
        remove(pos, value);
        add(pos, value * 2);
        break;
      }
      rem += 4;
      value_boxes = Array.from(document.querySelectorAll(".true"));
      value_boxes.reverse();
    }
  });
  add_random();
}

function moveDown() {
  let value_boxes = Array.from(document.querySelectorAll(".true"));
  value_boxes.reverse();

  value_boxes.forEach((element) => {
    let pos = Number.parseInt(element.id);
    let rem = pos % 4;
    let k = 0;

    while (pos < 12 && pos != 12 + rem - k) {
      if (
        allboxes[pos + 4].classList.contains("true") &&
        allboxes[pos + 4].textContent != allboxes[pos].textContent
      ) {
        break;
      }

      if (allboxes[12 + rem - k].classList.contains("false")) {
        let value = Number.parseInt(allboxes[pos].textContent);
        remove(pos, value);
        pos = 12 + rem - k;
        add(pos, value);
        break;
      }

      if (
        allboxes[12 + rem - k].classList.contains("true") &&
        allboxes[12 + rem - k].textContent === allboxes[pos].textContent
      ) {
        let value = Number.parseInt(allboxes[pos].textContent);
        remove(pos, value);
        pos = 12 + rem - k;
        remove(pos, value);
        add(pos, value * 2);
        break;
      }
      k += 4;
    }
    value_boxes = Array.from(document.querySelectorAll(".true"));
    value_boxes.reverse;
  });
  add_random();
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    default:
      console.log("use the four keys");
      break;
  }
  score.innerHTML = total_score;
});
