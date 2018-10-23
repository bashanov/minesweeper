export default function emoji(name) {
    let list = {
        flag: "\ud83d\udea9",
        magnifier: "\ud83d\udd0d",
        bomb: "\ud83d\udca3",
        joystick: "\ud83d\udd79\ufe0f",
        redHeart: "\u2764\ufe0f",
        trophy: "\ud83c\udfc6",
        seedling: "\ud83c\udf31",
        evergreenTree: "\ud83c\udf32",
        deciduousTree: "\ud83c\udf33",
        earOfRice: "\ud83c\udf3e",
        bug: "\ud83d\udc1b",
        blossom: "\ud83c\udf3c",
        sunflower: "\ud83c\udf3b",
    };
    return list[name] === undefined ? name : list[name];
}