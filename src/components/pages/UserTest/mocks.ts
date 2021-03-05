import { QuestionType, TypeUserTestQuestion } from "./types";

export const questions: TypeUserTestQuestion[] = [
    {
        id: 1,
        title: 'Когда и где состоялось первое испытание советской водородной бомбы?',
        image: 'https://s3-alpha-sig.figma.com/img/7371/3e24/4097ab69f3bc36a2f3d904583e5ac4bd?Expires=1615766400&Signature=VSQnqIWxQmGZuCdpExPPs7FHiVvmJDiR1niB8lc0sJNn0nfnowi0YmVIeIejsiajrBfjGb~SvmdTswsWORUrWOgmenCG9~o0Iw4IOW471Wp~uTE0U9x4cDDuhVCvzuObtyf7iAouGyH~WuB45PJEQNsY6hBcNoMlaRX68b~R-xaeqbSry9Z9rU42P7ObhGczGTYoUafhYNGMoTNoVQ7wEqjdPfkFSOyzRLtsAZIly-eFKdgV1iNVD0cLMvA8TEamNqwWTTpDSwdNXA5Dc4v6wyScubr-v0UEfo5~JC6WYVax76bzYz03xvhh~GmvfuFXhgrCL~XNH3R7QoEp2mCk0w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        type: QuestionType.SINGLE,
        options: [
            {
                title: '12 августа 1953 года, на Семипалатинском полигоне',
                value: 1
            },
            {
                title: '12 октября 1954, на полигоне на Новой земле',
                value: 2
            },
            {
                title: '11 сентября 1955, на полигоне Капустин Яр',
                value: 3
            },
            {
                title: '11 декабря 1956, на полигоне Азгир',
                value: 4
            }
        ]
    },
    {
        id: 2,
        title: 'Кто были президентами США?',
        type: QuestionType.MULTIPLE,
        options: [
            {
                title: 'Теодор Рузвельт',
                value: 1
            },
            {
                title: 'Владимир Путин',
                value: 2
            },
            {
                title: 'Дональд Трамп',
                value: 3
            },
            {
                title: 'Сергей Собянин',
                value: 4
            }
        ]
    },
    {
        id: 3,
        title: 'Где изображен самый эпичный взрыв?',
        type: QuestionType.SENGLE_PICTURE,
        options: [
            {
                title: 'https://s3-alpha-sig.figma.com/img/1c0e/0fc9/c3818fcfcad10836c3ca14b43304c361?Expires=1615766400&Signature=O4dhNfaURfZCYTHE3uKRqqWb~T0Zt8WmPIn03MYcYiYvnuV-Obl-C3tU5aAq0k0mD6bvTAiJfsTLcSB2auPptR3W~tN54tojDwAIPS6SvVpjg0FcHwwR0FWEtaJQrDKEY6nCc7dSUNe1z~J5JAo8jwFr2C0hKyT~gShEoWL0m7LhzMRRCLwlA9DHs98qCjolmUnmL2hD4nY6e8tl6wd09n4EgKLjoFdqJMOKSou7qP-3KWiHXoNNHu8WpgtMdVmmKRssKBy4WZQoWrag6w3xCOAJE2ZQY8ri2r8RiMBJIcwjen9xi6cA6Vv96FlStEFlhgG-hDIYn4U7Bfu4j2Ad6g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
                value: 1
            },
            {
                title: 'https://s3-alpha-sig.figma.com/img/7371/3e24/4097ab69f3bc36a2f3d904583e5ac4bd?Expires=1615766400&Signature=VSQnqIWxQmGZuCdpExPPs7FHiVvmJDiR1niB8lc0sJNn0nfnowi0YmVIeIejsiajrBfjGb~SvmdTswsWORUrWOgmenCG9~o0Iw4IOW471Wp~uTE0U9x4cDDuhVCvzuObtyf7iAouGyH~WuB45PJEQNsY6hBcNoMlaRX68b~R-xaeqbSry9Z9rU42P7ObhGczGTYoUafhYNGMoTNoVQ7wEqjdPfkFSOyzRLtsAZIly-eFKdgV1iNVD0cLMvA8TEamNqwWTTpDSwdNXA5Dc4v6wyScubr-v0UEfo5~JC6WYVax76bzYz03xvhh~GmvfuFXhgrCL~XNH3R7QoEp2mCk0w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
                value: 2
            },
            {
                title: 'https://s3-alpha-sig.figma.com/img/0f05/3bfe/7dac405cf6ffd79ae6145cf8788f3a8d?Expires=1615766400&Signature=eoJ-Jf6diKJaeyOKEW2MyiZWmhd~Ox0AgG6QwmknOONsXZitdiG0CTnkHLh6z9KEytsXYdOByyoElqbpJfFqk1Pd6mwV1EqI6csRVjGI~0USRCOcCyGC0zWCJ8WkLZ-wbLuRXagKF1P0yoSEee7OjeE8s9tc7HLC9A54h5wQIupNr2X1CvrjWXFLw3~5mT8TJ0p0R4g2JA2kBgYcYCTJl~CB8QGkhcDKKiRXJkYIH3Sx5lzlQPdVGU9fBrCPSrgD1I-Vy8zoaGOKMgMsW5SsuhvBWTrgTnWmsqVkLFyffEhROftmNNbbFWPOp2Uen7FGC7gh5jUkdAekOJO8l6Ucpw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
                value: 3
            },
            {
                title: 'https://s3-alpha-sig.figma.com/img/2436/e277/19dc00812c0237a96077c5328bda60d9?Expires=1615766400&Signature=eL-dfHdx6sngnG3Hc0gcBL6cDmwQE6OLXAabwxRZ~qOUvbsSA6Qwfqbk~4cgjFOW7a0iuy~m1958FcVhqx8ju99DSF9476SQ4vcFupcpXSH66Rvbp5eQVhfbwdomSa6QVWoBK7OjFIGz5OjIo8JYTFMI11fO8qFfvsLKlT84FIQ70FbaUBaPxKCQgyULpXmp7zcN0sBDtS5td007oniU0ij0JodUOOiP6ZI4a5ogiN3nZJNHeTB3JsDkQWhWJ49T1XVbcXEzqHwAt2kL5jdcanPG1isf62EE956fThHicsPDNzkGl4EttRABMDv3Peh8OPsqtp~F8iGlSnP4r-tJZw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
                value: 4
            }
        ]
    },
];