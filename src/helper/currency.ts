const rupiah = (number: any) => {
  let payload = Number(number) ? Number(number) : 0;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(payload);
};

export default rupiah
