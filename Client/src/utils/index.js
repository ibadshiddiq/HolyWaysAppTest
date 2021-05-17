export function convertToRupiah(angka) {
  var rupiah = "";
  var angkarev = angka.toString().split("").reverse().join("");
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
  return (
    "Rp. " +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")
  );
}

export function getTotal(userDonate) {
  return userDonate
    .map((user) => (user.status === "success" ? user.donateAmount : 0))
    .reduce((total, num) => total + num, 0);
}

export function getProgress(userDonate, goal) {
  const total = getTotal(userDonate);
  const percent = (total / goal) * 100;
  return percent;
}
