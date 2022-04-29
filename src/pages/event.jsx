import React, { Component } from "react";
import $ from "jquery";
import Card from "../components/cardEvent.jsx"
class Event extends Component {
    constructor() {
        super()
        this.state = {
            event: [
                {
                    nama: "Bike To Work Day",
                    tanggal: "10 Juni 2022",
                    lokasi: "Jalannin Aja Dulu",
                    gambar: "https://media.istockphoto.com/vectors/bike-to-work-day-vector-id1140657389?s=612x612"
                },
                {
                    nama: "World Mountain Day",
                    tanggal: "11 Desember 2022",
                    lokasi: "Gunung Nan Jauh Disana",
                    gambar: "https://thumbs.dreamstime.com/b/international-mountain-day-card-december-th-hohiday-peaks-geometric-nature-landscape-flat-vector-illustration-banner-world-165155085.jpg"
                },
                {
                    nama: "World Forest Day",
                    tanggal: "21 Maret 2023",
                    lokasi: "Sungai Pelangi",
                    gambar: "https://png.pngtree.com/png-clipart/20201208/original/pngtree-earth-and-tree-international-forest-day-elements-png-image_5569181.jpg"
                },
                {
                    nama: "National Ocean and Ocean Remembrance Day",
                    tanggal: "15 Januari 2023",
                    lokasi: "Samudra Cinta",
                    gambar: "https://img.prod.aplaceformom.com/main/uploads/va/2015/11/National-Pearl-HarborRemembranceDay-300x300.jpg"
                },
                {
                    nama: "National Garbage Awareness Day",
                    tanggal: "21 Febuari 2023",
                    lokasi: "Taman Tadika Mesra",
                    gambar: "https://scontent.fcgk23-1.fna.fbcdn.net/v/t39.30808-6/273967068_5346648158681523_3678501949180400245_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=973b4a&_nc_ohc=Tx36K_Geq7oAX_hAQru&_nc_ht=scontent.fcgk23-1.fna&oh=00_AT_wtTiIQt0L1dt5bKJh9XeqO2FZOu9sebPqZDu_Cknaxg&oe=623D0E0F"
                },
            ],

            action: "",
            nama: "",
            tanggal: "",
            lokasi: "",
            gambar: "",
            selectedItem: null,
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.event.map((item, index) => (
                        <Card
                            nama={item.nama}
                            tanggal={item.tanggal}
                            lokasi={item.lokasi}
                            gambar={item.gambar}
                            onEdit={() => this.Edit(item)}
                            onDrop={() => this.Drop(item)}
                        />
                    ))}
                </div>
                
                <button className="btn btn-success" onClick={() => this.Add()}>

                    Tambah Data
                </button>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_event">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-body">
                                Form Event
                            </div>
                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Nama Event :
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({
                                            nama:
                                                ev.target.value
                                        })}
                                        required />

                                    Tanggal :
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.tanggal}
                                        onChange={ev => this.setState({
                                            tanggal
                                                : ev.target.value
                                        })}
                                        required />

                                    Lokasi :
                                    <input type="text" className="form-control b-2"
                                        value={this.state.lokasi}
                                        onChange={ev => this.setState({ lokasi: ev.target.value })}
                                        required />

                                    Gambar Event :
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
        $("#modal_event").show();
        this.setState({
            nama: "",
            tanggal: "",
            lokasi: "",
            gambar: "",
            action: "insert"
        })
    }
    Edit = (item) => {
        // menampilkan komponen modal
        $("#modal_event").show();
        this.setState({
            nama: item.nama,
            tanggal: item.tanggal,
            lokasi: item.lokasi,
            gambar: item.gambar,
            action: "update",
            selectedItem: item
        })
    }
    Save = (event) => {
        event.preventDefault();
        // menampung data state event
        let tempEvent = this.state.event
        if (this.state.action === "insert") {
            // menambah data baru
            tempEvent.push({
                nama: this.state.nama,
                tanggal: this.state.tanggal,
                lokasi: this.state.lokasi,
                gambar: this.state.gambar,
            })
        } else if (this.state.action === "update") {
            // menyimpan perubahan data
            let index = tempEvent.indexOf(this.state.selectedItem)
            tempEvent[index].nama = this.state.nama
            tempEvent[index].tanggal = this.state.tanggal
            tempEvent[index].lokasi = this.state.lokasi
            tempEvent[index].gambar = this.state.gambar
        }
        this.setState({ event: tempEvent })
        // menutup komponen modal_event
        $("#modal_event").hide();
    }

    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            // menghapus data
            let tempEvent = this.state.event
            // posisi index data yg akan dihapus
            let index = tempEvent.indexOf(item)
            // hapus data
            tempEvent.splice(index, 1)
            this.setState({ event: tempEvent })
        }
    }

}
export default Event;