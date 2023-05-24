import Grid from "@mui/material/Grid";
import Swal from 'sweetalert2'
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
  styled,
  Box,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const UserCards = ({user,userInfo,setUserInfo}: any): JSX.Element => {
  function DelteUser(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result:any) => {
      if (result.isConfirmed) {
        if (userInfo.length > 6) {
          const updateUser = userInfo.filter((item: any) => id !== item.login.uuid);
          setUserInfo(updateUser);
          localStorage.setItem("userInfo", JSON.stringify(updateUser));
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else {
          Swal.fire(
            'Failed!',
            'Maximum reached!!.',
            'error'
          )
        }
     
      }
    })

  }

  return (
    <>
      <Grid item xs={2} sm={4} md={4} sx={{  }}>
        {/* <Item> */}
        <Card
          sx={{
            maxWidth: 345,
            marginLeft: 12,
            background: "#1e1e1e",
            color: "white",
          }}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            height="280"
            image={user.picture.large}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography gutterBottom variant="h5" component="div">
              {user.name.title} {user.name.first} {user.name.last}
            </Typography>
            <Box textAlign="center">
              <Button
                sx={{
                  background: "red",
                  fontWeight: "bold",
                  "&:hover": { background: "#890000" },
                }}
                onClick={() => DelteUser(user.login.uuid)}
                variant="contained"
              >
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
        {/* </Item> */}
      </Grid>
    </>
  );
};

export default UserCards;
