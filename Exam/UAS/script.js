const electron = require('electron');
const {ipcRenderer} = electron;
const data = "produk.json";
const listProduk = document.querySelector('#daftar-produk');
var urlParams = new URLSearchParams(window.location.search);
var type = urlParams.get("type");


function getListProduk(){
    // console.log(type);
    fetch(data)
        .then(Response => {
            return Response.json();
        })
        .then(ResponseJson => {
            console.log(ResponseJson);
            showListProduk(ResponseJson);
            if(type == null){
                showListProduk(ResponseJson);
                keranjang(ResponseJson);
            } else{
                showListProdukType(ResponseJson);
            }
        })
        .catch(error => {
            console.error();
        })
}

const showListProduk = pdk => {
    listProduk.innerHTML = "";
    pdk.forEach(item => {
        listProduk.innerHTML += `
        <div class="col s12 m4">
            <div class="card">
                <div class="card-image">
                    <img src="${item.filename}">
                    <a id="btnAdd" class="btn-floating halfway-fab waves-effect waves-light red">
                        <i class="material-icons">add</i>
                    </a>
                </div>
                <div class="card-content">
                    <span class="card-title">${item.title}</span>
                    <br>${item.description}<br>
                    Type\t\t: ${item.type}<br>
                    Rating\t\t: ${item.rating}<br><br>
                    <span class="card-title">Price\t\t: ${item.price} </span>
                </div>
            </div>
        </div>
        `
        document.getElementById('btnAdd').addEventListener('click', function(){
            document.querySelector('#data-list').innerHTML = "";
            // pdk.forEach(item => {
                document.querySelector('#data-list').innerHTML += `
                <div class="col s12 m4">
                    <div class="card">
                        <div class="card-image">
                            <img src="${item.filename}">
                        </div>
                        <div class="card-content">
                            <span class="card-title">${item.title}</span>
                            <br>${item.description}<br>
                            Type\t\t: ${item.type}<br>
                            Rating\t\t: ${item.rating}<br><br>
                            <span class="card-title">Price\t\t: ${item.price} </span>
                        </div>
                    </div>
                </div>
                `
            // });
        });
    });
}

const showListProdukType = pdk => {
    listProduk.innerHTML = "";
    pdk.forEach(item => {
        if(item.type == type){
        listProduk.innerHTML += `
        <div class="col s12 m4">
            <div class="card">
                <div class="card-image">
                    <img src="${item.filename}">
                    <a id="btnAdd" class="btn-floating halfway-fab waves-effect waves-light red">
                        <i class="material-icons">add</i>
                    </a>
                </div>
                <div class="card-content">
                    <span class="card-title">${item.title}</span>
                    <br>${item.description}<br>
                    Type\t\t: ${item.type}<br>
                    Rating\t\t: ${item.rating}<br><br>
                    <span class="card-title">Price\t\t: ${item.price} </span>
                </div>
            </div>
        </div>
        `
        document.getElementById('btnAdd').addEventListener('click', function(){
            document.querySelector('#data-list').innerHTML = "";
            // pdk.forEach(item => {
                document.querySelector('#data-list').innerHTML += `
                <div class="col s12 m4">
                    <div class="card">
                        <div class="card-image">
                            <img src="${item.filename}">
                        </div>
                        <div class="card-content">
                            <span class="card-title">${item.title}</span>
                            <br>${item.description}<br>
                            Type\t\t: ${item.type}<br>
                            Rating\t\t: ${item.rating}<br><br>
                            <span class="card-title">Price\t\t: ${item.price} </span>
                        </div>
                    </div>
                </div>
                `
            // });
        });
        }
    });
}

document.addEventListener('DOMContentLoaded', getListProduk);
