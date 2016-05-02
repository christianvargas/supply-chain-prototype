$.notify.addStyle("metro", {
    html:
        "<div>" +
            "<div class='image' data-notify-html='image'/>" +
            "<div class='text-wrapper'>" +
                "<div class='title' data-notify-html='title'/>" +
                "<div class='text' data-notify-html='text'/>" +
            "</div>" +
        "</div>",
    classes: {
        default: {
            "color": "#333333 !important",
            "background-color": "#ABB7B7",
            "border": "1px solid #ABB7B7"
        },
        error: {
            "color": "#333333 !important",
            "background-color": "#FE774F",
            "border": "1px solid #FE774F"
        },
        success: {
            "color": "#333333 !important",
            "background-color": "#44DBAB",
            "border": "1px solid #44DBAB"
        },
        info: {
            "color": "#333333 !important",
            "background-color": "#C3BCB2",
            "border": "1px solid #C3BCB2"
        },
        warning: {
            "color": "#333333 !important",
            "background-color": "#C3BCB2",
            "border": "1px solid #C3BCB2"
        },
        black: {
            "color": "#333333 !important",
            "background-color": "#333",
            "border": "1px solid #000"
        },
        cool: {
            "color": "#333333 !important",
            "background-color": "#4A525F",
            "border": "1px solid #4A525F"
        },
        nonspaced: {
            "color": "#333333 !important",
            "background-color": "#4A525F",
            "min-width": "150px",
            "border": "1px solid #4A525F"
        },
        white: {
            "background-color": "#f1f1f1",
            "border": "1px solid #ddd"
        }
    }
});
