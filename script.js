//? Selectors

//* add form

const ekleBtn = document.querySelector("#ekle-btn")
const gelirInput = document.querySelector("#gelir-input")
const ekleFormu = document.querySelector("#ekle-formu")

//* result table

const gelirinizTable = document.getElementById("geliriniz")
const giderinizTable = document.getElementById("gideriniz")
const kalanTable = document.getElementById("kalan")


//? Variables

let gelirler = Number(localStorage.getItem("gelirler")) || 0;
let harcamaListesi = JSON.parse(localStorage.getItem("harcamalar")) || [];


//* expenditure form

const harcamaFormu = document.getElementById("harcama-formu");
const tarihInput = document.getElementById("tarih");
const miktarInput = document.getElementById("miktar");
const harcamaAlaniInput = document.getElementById("harcama-alani");

//* expenditure table

const harcamaBody = document.getElementById("harcama-body");
const temizleBtn = document.getElementById("temizle-btn");


//! filling the first form

harcamaFormu.addEventListener("submit", (e) => {
    e.preventDefault() //to prevent reload

    const yeniHarcama = {
        tarih: tarihInput.value,
        miktar: miktarInput.value,
        aciklama: harcamaAlaniInput.value,
        id: new Date().getTime()
    };

    harcamaListesi.push(yeniHarcama);

    //! localStorage
    localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi))

    harcamaShowScreen(yeniHarcama);

    harcamaFormu.reset()
    //tarihInput=""

    calcUpdate()
});


//! push expenses to table in DOM

const harcamaShowScreen = ({ id, miktar, tarih, aciklama }) => {
    //const harcamaShowScreen=(harcamaListesi)
    //const {id, miktar, tarih, aciklama}=harcamaListesi

    harcamaBody.innerHTML += `
    <tr>
    <td class="bg-warning">${tarih}</td>
    <td class="bg-warning">${aciklama}</td>
    <td class="bg-warning">${miktar}</td>
    <td class="bg-warning"><i id=${id} class="fa-solid fa-trash-can text-danger"  type="button"></i></td>
    </tr>
    `;

    //! deletion

    document.querySelectorAll(".fa-trash-can").forEach((sil) => {
        sil.onclick = () => {
            sil.parentElement.parentElement.remove();


            harcamaListesi=harcamaListesi.filter((a)=>{
                a.id !=sil.id
            })
            localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi))

        }
    })

};


//! add form

ekleFormu.addEventListener("submit", (e) => {
    e.preventDefault()

    gelirler = gelirler + Number(gelirInput.value)

    gelirInput.value = ""
    // gelirinizTable.textContent = gelirler

    localStorage.setItem("gelirler", gelirler)

    calcUpdate()
})


//! calculate and update

const calcUpdate = () => {
    gelirinizTable.textContent = gelirler;

    const giderler = harcamaListesi.reduce((toplam, harcama) => toplam + Number(harcama.miktar), 0)

    giderinizTable.textContent = giderler

    kalanTable.textContent = gelirler - giderler

};

//! clear information 

temizleBtn.onclick = () => {
    if (confirm("Are you sure you want to delete all data?")) {
        harcamaListesi = []

        gelirler = 0

        calcUpdate()

        harcamaBody.innerHTML = ""
    }
}



//! in case of refresh, data from localStorage is printed on the screen

harcamaListesi.forEach((a)=>{
    harcamaShowScreen(a)
})

//harcamaShowScreen(harcamaListesi)
calcUpdate()