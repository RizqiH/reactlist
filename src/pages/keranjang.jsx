import React, { Component } from "react";
import $ from "jquery";
import Card from "../components/cardKeranjang"
class Keranjang extends Component {
    constructor() {
        super()
        this.state = {
            keranjang: [
                {
                    album: "Take Me Home",
                    harga: 500000,
                    jumlah: 1,
                    gambar: "https://upload.wikimedia.org/wikipedia/en/7/79/Take_Me_Home_by_One_Direction.png"
                },
                {
                    album: "Up All Night",
                    harga: 575000,
                    jumlah: 1,
                    gambar: "https://m.media-amazon.com/images/I/613eDDaw9uL._SX450_.jpg "
                },
                {
                    album: "Midnight Memories",
                    harga: 575000,
                    jumlah: 1,
                    gambar: "https://upload.wikimedia.org/wikipedia/id/2/28/One_Direction_Midnight_Memories_%28Official_Album_Cover%29.png"
                },
                {
                    album: "Four",
                    harga: 575000,
                    jumlah: 1,
                    gambar: "https://upload.wikimedia.org/wikipedia/en/e/e8/One_Direction_-_Four.png"
                },
                {
                    album: "Made In The A.M.",
                    harga: 575000,
                    jumlah: 1,
                    gambar: "https://t2.genius.com/unsafe/212x212/https%3A%2F%2Fimages.rapgenius.com%2F84a6443b52b36fe95f20735c6e8f3ba4.1000x1000x1.jpg"
                },
            ],

            action: "",
            album: "",
            gambar: "",
            harga: 0,
            jumlah: 0,
            selectedItem: null,
        }
        this.state.filterKeranjang = this.state.keranjang
    }
    render() {
        return (
            <div className="container">
                <input type="text" className="form-control my-2" placeholder="Pencarian"
                    value={this.state.keyword}
                    onChange={ev => this.setState({ keyword: ev.target.value })}
                    onKeyUp={ev => this.searching(ev)}
                />
                <div className="row">
                    {this.state.filterKeranjang.map((item, index) => (
                        <Card
                            album={item.album}
                            gambar={item.gambar}
                            harga={item.harga}
                            jumlah={item.jumlah}
                            onEdit={() => this.Edit(item)}
                            onDrop={() => this.Drop(item)}
                        />
                    ))}
                </div>
                <button className="btn btn-success" onClick={() => this.Add()} >
                    Tambah Album
                </button>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_keranjang">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-body">
                                Form Keranjang
                            </div>
                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Nama Album
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.album}
                                        onChange={ev => this.setState({
                                            album:
                                                ev.target.value
                                        })}
                                        required />

                                    Harga Album
                                    <input type="number" className="form-control mb-2"
                                        value={this.state.harga}
                                        onChange={ev => this.setState({
                                            harga:
                                                ev.target.value
                                        })}
                                        required />

                                    Jumlah Album
                                    <input type="number" className="form-control mb-2"
                                        value={this.state.jumlah}
                                        onChange={ev => this.setState({
                                            jumlah:
                                                ev.target.value
                                        })}
                                        required />

                                    Gambar Album
                                    <input type="url" className="form-control mb-2"
                                        value={this.state.gambar}
                                        onChange={ev => this.setState({
                                            gambar:
                                                ev.target.value
                                        })}
                                        required />

                                    <button className="btn btn-info btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    Add = () => {
        // menampilkan komponen modal
        $("#modal_keranjang").show();
        this.setState({
            album: "",
            gambar: "",
            harga: 0,
            jumlah: 0,
            action: "insert"
        })
    }

    Edit = (item) => {
        // menampilkan komponen modal
        $("#modal_keranjang").show();
        this.setState({
            album: item.album,
            gambar: item.gambar,
            jumlah: item.jumlah,
            harga: item.harga,
            action: "update",
            selectedItem: item
        })
    }

    Save = (event) => {
        event.preventDefault();
        // menampung data state keranjang
        let tempKeranjang = this.state.keranjang
        if (this.state.action === "insert") {
            // menambah data baru
            tempKeranjang.push({
                album: this.state.album,
                harga: this.state.harga,
                jumlah: this.state.jumlah,
                gambar: this.state.gambar,
            })
        } else if (this.state.action === "update") {
            // menyimpan perubahan data
            let index = tempKeranjang.indexOf(this.state.selectedItem)
            tempKeranjang[index].album = this.state.album
            tempKeranjang[index].jumlah = this.state.jumlah
            tempKeranjang[index].harga = this.state.harga
            tempKeranjang[index].gambar = this.state.gambar
        }
        this.setState({ keranjang: tempKeranjang })
        // menutup komponen modal_keranjang
        $("#modal_keranjang").hide();
    }

    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            // menghapus data
            let tempKeranjang = this.state.keranjang
            // posisi index data yg akan dihapus
            let index = tempKeranjang.indexOf(item)
            // hapus data
            tempKeranjang.splice(index, 1)
            this.setState({ keranjang: tempKeranjang })
        }
    }

    searching = event => {
        if (event.keyCode === 13) {
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempKeranjang = this.state.keranjang
            let result = tempKeranjang.filter(item => {
                return item.album.toLowerCase().includes(keyword)
            })
            this.setState({ filterKeranjang: result })
        }
    }
}
export default Keranjang;