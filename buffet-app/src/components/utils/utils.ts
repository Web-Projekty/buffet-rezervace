export const formatCurrency = (number: number): string => {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
  }).format(number);
};

export const removeDiacritics = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
};

export const extractToken = (header: string | null): string => {
  return header ? header.split(" ")[1] : "";
};

export const formatDate = (date: string): string => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("cs-CZ");
};

export const parseSelectedTime = (selectedTime: string | null) => {
  if (!selectedTime) return { startTime: "", endTime: "", formattedDate: "" };

  const parts = selectedTime.split(" ");
  const day = parts[1].split(".")[0].padStart(2, "0");
  const month = parts[2].split(".")[0].padStart(2, "0");
  const year = new Date().getFullYear();

  const formattedDate = `${year}-${month}-${day}`;

  const [startTime, endTime] = parts[3].split("-");

  console.log(formattedDate);

  return { startTime, endTime, formattedDate };
};

export const onImageChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImage: (image: string) => void,
) => {
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
};

export const formatUnixDate = (date: string): string => {
  const dateObject = new Date(parseInt(date));
  return dateObject.toLocaleDateString("cs-CZ");
};

export const formatToUnixDate = (date: string): string => {
  const dateObject = new Date(date);
  return Math.floor(dateObject.getTime() / 1000).toString();
};

export const matchValues = (text: string, text2: string): boolean => {
  return text === text2;
};
