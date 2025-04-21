import React, { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Layout containers
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// DataTable component
import DataTable from "examples/Tables/DataTable";

function Penjualan() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    color: "info",
    icon: "info",
    title: "Notifikasi",
    content: "",
  });

  const openSnackbar = (color, icon, content) => {
    setSnackbar({
      open: true,
      color,
      icon,
      title: "Notifikasi",
      content,
    });
  };

  const closeSnackbar = () =>
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));

  const columns = [
    { Header: "ID", accessor: "id", align: "left" },
    { Header: "Nama Produk", accessor: "nama", align: "left" },
    { Header: "Jumlah", accessor: "jumlah", align: "center" },
    { Header: "Harga", accessor: "harga", align: "center" },
    { Header: "Aksi", accessor: "aksi", align: "center" },
  ];

  const rows = [
    {
      id: "1",
      nama: "Produk A",
      jumlah: 10,
      harga: "Rp 50.000",
      aksi: (
        <MDBox display="flex" gap={2} justifyContent="center">
          <MDButton
            variant="gradient"
            color="info"
            onClick={() => openSnackbar("info", "edit", "Edit Produk A")}
          >
            Edit
          </MDButton>
          <MDButton
            variant="gradient"
            color="error"
            onClick={() => openSnackbar("error", "delete", "Hapus Produk A")}
          >
            Hapus
          </MDButton>
        </MDBox>
      ),
    },
    {
      id: "2",
      nama: "Produk B",
      jumlah: 5,
      harga: "Rp 75.000",
      aksi: (
        <MDBox display="flex" gap={2} justifyContent="center">
          <MDButton
            variant="gradient"
            color="info"
            onClick={() => openSnackbar("info", "edit", "Edit Produk B")}
          >
            Edit
          </MDButton>
          <MDButton
            variant="gradient"
            color="error"
            onClick={() => openSnackbar("error", "delete", "Hapus Produk B")}
          >
            Hapus
          </MDButton>
        </MDBox>
      ),
    },
  ];

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
                  Data Penjualan
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
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

      {/* Snackbar Notification */}
      <MDSnackbar
        color={snackbar.color}
        icon={snackbar.icon}
        title={snackbar.title}
        content={snackbar.content}
        dateTime="baru saja"
        open={snackbar.open}
        onClose={closeSnackbar}
        close={closeSnackbar}
        bgWhite
      />
    </DashboardLayout>
  );
}

export default Penjualan;
