export const formSetter = (state) => {
  const form1 = document.getElementsByClassName("lc-container1")[0];
  const form2 = document.getElementsByClassName("lc-container2")[0];

  if (state === true) {
    form1.style.display = "block";
    form2.style.display = "none";
  } else {
    form2.style.display = "block";
    form1.style.display = "none";
  }
};
