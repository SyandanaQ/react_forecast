import React, { useState, useEffect } from "react";
import { getSales, addSale, updateSale, deleteSale } from "../../api";

// @mui material
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

// Material Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// DataTable
import DataTable from "examples/Tables/DataTable";

function Sales() {
  const [sales, setSales] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newSale, setNewSale] = useState({
    id: "",
    nama_produk: "",
    harga: "",
    tanggal: "",
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null); // Menyimpan ID penjualan yang akan dihapus

  // Ambil data dari backend saat komponen dimuat
  useEffect(() => {
    const fetchSales = async () => {
      const data = await getSales();
      console.log(data); // Menampilkan data yang diterima dari backend
      setSales(data);
    };
    fetchSales();
  }, []);

  // Input perubahan
  const handleChange = (e) => {
    setNewSale({ ...newSale, [e.target.name]: e.target.value });
  };

  // Simpan data baru ke backend
  const handleSubmit = async () => {
    try {
      // Jika ID ada, lakukan update
      if (newSale.id) {
        const updatedSale = await updateSale(newSale.id, newSale);
        setSales(sales.map((sale) => (sale.id === updatedSale.id ? updatedSale : sale)));
        // Tutup dialog edit setelah update
        setOpenEditDialog(false);
      } else {
        // Jika ID tidak ada, lakukan tambah data baru
        const addedSale = await addSale(newSale);
        setSales([...sales, addedSale]);
        // Tutup dialog tambah setelah simpan
        setOpenAddDialog(false);
      }

      // Reset form setelah simpan
      setNewSale({ nama_produk: "", harga: "", tanggal: "" });

      // Lakukan refresh halaman (bisa dihilangkan jika tidak perlu)
      window.location.reload();
    } catch (error) {
      console.error("Gagal menyimpan data", error);
    }
  };

  const handleEdit = (sale) => {
    // Mengonversi tanggal dari UTC ke lokal
    const formattedDate = new Date(sale.tanggal).toISOString().slice(0, 10); // Format ke YYYY-MM-DD
    setNewSale({
      id: sale.id, // Pastikan ID ada di sini
      nama_produk: sale.nama_produk,
      harga: sale.harga,
      tanggal: formattedDate, // Set tanggal sesuai format
    });
    setOpenEditDialog(true); // Buka dialog untuk edit
  };

  const handleDelete = async (id) => {
    try {
      await deleteSale(id); // Menggunakan deleteSale yang sudah diimpor
      setSales(sales.filter((sale) => sale.id !== id)); // Menghapus data dari state
    } catch (error) {
      console.error("Gagal menghapus data", error);
    }
  };

  const handleDeleteConfirmation = (sale) => {
    setSaleToDelete(sale); // Simpan data yang akan dihapus
    setOpenDeleteDialog(true); // Tampilkan dialog konfirmasi
  };

  // Kolom tabel
  const columns = [
    { Header: "ID", accessor: "id", align: "left" },
    { Header: "Nama Produk", accessor: "nama_produk", align: "left" },
    { Header: "Harga", accessor: "harga", align: "center" },
    { Header: "Tanggal", accessor: "tanggal", align: "center" },
    { Header: "Aksi", accessor: "aksi", align: "center" },
  ];

  // Baris tabel
  const rows = sales.map((sale) => ({
    id: sale.id,
    nama_produk: sale.nama_produk,
    harga: `Rp ${sale.harga}`,
    tanggal: sale.tanggal ? sale.tanggal.split("T")[0] : "", // Hanya tampilkan tanggal
    aksi: (
      <>
        <MDButton variant="outlined" color="info" onClick={() => handleEdit(sale)}>
          Edit
        </MDButton>
        <MDButton variant="outlined" color="error" onClick={() => handleDeleteConfirmation(sale)}>
          Hapus
        </MDButton>
      </>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Data Sales
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <MDButton
                  variant="gradient"
                  color="success"
                  onClick={() => {
                    setNewSale({ nama_produk: "", harga: "", tanggal: "" }); // Reset form sebelum membuka dialog
                    setOpenAddDialog(true);
                  }} // Buka dialog tambah data
                  style={{ marginBottom: "16px" }}
                >
                  Tambah Data Sales
                </MDButton>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Dialog Tambah Data */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Tambah Data Sales</DialogTitle>
        <DialogContent>
          <TextField
            label="Nama Produk"
            name="nama_produk"
            value={newSale.nama_produk}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="standard"
          />
          <TextField
            label="Harga"
            name="harga"
            type="number"
            value={newSale.harga}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="standard"
          />
          <TextField
            label="Tanggal"
            name="tanggal"
            type="date"
            value={newSale.tanggal}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <MDButton onClick={() => setOpenAddDialog(false)} color="secondary">
            Batal
          </MDButton>
          <MDButton onClick={handleSubmit} color="success">
            Simpan
          </MDButton>
        </DialogActions>
      </Dialog>

      {/* Dialog Edit Data */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Data Sales</DialogTitle>
        <DialogContent>
          <TextField
            label="Nama Produk"
            name="nama_produk"
            value={newSale.nama_produk}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="standard"
          />
          <TextField
            label="Harga"
            name="harga"
            type="number"
            value={newSale.harga}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="standard"
          />
          <TextField
            label="Tanggal"
            name="tanggal"
            type="date"
            value={newSale.tanggal}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <MDButton onClick={() => setOpenEditDialog(false)} color="secondary">
            Batal
          </MDButton>
          <MDButton onClick={handleSubmit} color="success">
            Simpan
          </MDButton>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Konfirmasi Hapus Data</DialogTitle>
        <DialogContent>
          <MDTypography>Apakah Anda yakin ingin menghapus data ini?</MDTypography>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={() => setOpenDeleteDialog(false)} color="secondary">
            Batal
          </MDButton>
          <MDButton
            onClick={async () => {
              try {
                // Hapus data yang terpilih
                await deleteSale(saleToDelete.id);
                setSales(sales.filter((sale) => sale.id !== saleToDelete.id)); // Update state setelah data dihapus
                setOpenDeleteDialog(false); // Tutup dialog
              } catch (error) {
                console.error("Gagal menghapus data", error);
              }
            }}
            color="error"
          >
            Hapus
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Sales;
