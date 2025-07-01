//카테고리
const categories = [
    // { _id: 1, name: "패션의류/잡화" },
    // { _id: 2, name: "뷰티" },
    // { _id: 3, name: "출산/유아동" },
    // { _id: 4, name: "식품" },
    // { _id: 5, name: "주방용품" },
    // { _id: 6, name: "생활용품" },
    // { _id: 7, name: "홈인테리어" },
    // { _id: 8, name: "가전디지털" },
    // { _id: 9, name: "스포츠/레저" },
    // { _id: 10, name: "자동차용품" },
    // { _id: 11, name: "도서/음반/DVD" },
    // { _id: 12, name: "완구/취미" },
    // { _id: 13, name: "문구/오피스" },
    // { _id: 14, name: "반려동물용품" },
    // { _id: 15, name: "헬스/건강식품" },
    { _id: 1, name: "ファッション" },
    { _id: 2, name: "ビューティー" },
    { _id: 3, name: "ベビー・キッズ" },
    { _id: 4, name: "食品" },
    { _id: 5, name: "キッチン" },
    { _id: 6, name: "生活用品" },
    { _id: 7, name: "インテリア" },
    { _id: 8, name: "家電" },
    { _id: 9, name: "スポーツ" },
    { _id: 10, name: "車用品" },
    { _id: 11, name: "本・DVD" },
    { _id: 12, name: "ホビー" },
    { _id: 13, name: "文房具" },
    { _id: 14, name: "ペット" },
    { _id: 15, name: "健康食品" },
];

//가격
const prices = [
    {
        _id: 0,
        name: "すべて",
        array: [],
    },

    {
        _id: 1,
        name: "0 ~ 1万円",
        array: [0, 10000],
    },

    {
        _id: 2,
        name: "万円 ~ 5万円",
        array: [10000, 50000],
    },

    {
        _id: 3,
        name: "5万円 ~ 10万円",
        array: [50000, 100000],
    },

    {
        _id: 4,
        name: "10万円 ~ 50万円",
        array: [100000, 500000],
    },

    {
        _id: 5,
        name: "50万円以上",
        array: [500000, 210000000],
    },
];

export { categories, prices };
