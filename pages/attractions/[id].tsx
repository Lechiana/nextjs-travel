import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "/styles/Home.module.css";
import Image from "next/image";

import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Breadcrumbs,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";

type Data = {
  id: string;
  name: string;
  coverimage: string;
  detail: string;
};

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<Data>({
    id: "",
    name: "",
    coverimage: "",
    detail: "",
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch("http://localhost:3000/api/attractions/" + id)
        .then((res) => res.json())
        .then((data) => {
          setData(data[0]);
          setLoading(false);
        });
    }
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <Link href="/attractions">Collection</Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>

      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb" sx={{ pl: 10, pb: 6 }}>
          <Link color="inherit" href="/attractions">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            HOME
          </Link>
          <Link color="inherit" href={"/attractions/" + data.id}>
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {data.name}
          </Link>
        </Breadcrumbs>
      </div>

      <Container maxWidth="md" sx={{ pb: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} key={data.id}>
            <Card>
              <CardMedia
                component="img"
                height="600"
                image={data.coverimage}
                alt={data.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  noWrap={true}
                >
                  {data.detail}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <footer className={styles.footer}>
        <a target="_blank" rel="noopener noreferrer">
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Page;
