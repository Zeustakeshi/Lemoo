const illustrations = [
    "https://notioly.com/wp-content/uploads/2024/03/367.Alphabet.png",
    "https://notioly.com/wp-content/uploads/2024/03/362.Growth.png",
    "https://notioly.com/wp-content/uploads/2024/02/359.Chill-Time.png",
    "https://notioly.com/wp-content/uploads/2024/02/354.Pros-And-Cons.png",
    "https://notioly.com/wp-content/uploads/2024/02/348.Clock-Is-Ticking.png",
    "https://notioly.com/wp-content/uploads/2023/11/315.Knowledge-Base.png",
    "https://notioly.com/wp-content/uploads/2023/09/290.Globalization.png",
    "https://notioly.com/wp-content/uploads/2023/09/287.Smart-Watch.png",
];

export const randomIllustration = () => {
    return illustrations[Math.floor(Math.random() * illustrations.length)];
};
