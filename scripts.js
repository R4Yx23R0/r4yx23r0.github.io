lang = new URLSearchParams(window.location.search).get("lang");
lang_data = "";

async function LoadLang()
{
    path = "lang/pl.json"
    switch (lang)
    {
        case "en": path = "lang/en.json"; break;
        case "pl": path = "lang/pl.json"; break;
        default: lang = "pl"; path = "lang/pl.json";
    }

    response = await fetch(path + "?nocache=" + Date.now());
    if (!response.ok) throw new Error(response.status);
    lang_data = await response.json();

    // setup
    //console.log(lang_data)
    document.title = lang_data['title']

    document.querySelectorAll('[data-lt]').forEach(e => {
        e.innerHTML = lang_data[e.getAttribute('data-lt')];
    });

    document.getElementById("lang_bt_img").src = "lang/" + lang_data["lang_button_flag"] + ".png"; 
} 
function changeLang() {
    if (lang == "pl") lang = "en";
    else lang = "pl";

    console.log(`lang set to ${lang}`);

    params = new URLSearchParams(window.location.search);
    if (!params.has("lang")) params.append("lang",lang)
    else params.set("lang",lang);
        window.history.pushState({}, "", "?" + params.toString());

    LoadLang();
}

LoadLang();