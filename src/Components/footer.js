import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
      {/* <!-- Footer --> */}
      <footer
        className="page-footer font-small special-color-dark pt-4"
        style={{
          background: "#263238",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* <!-- Footer Elements --> */}
        <div className="container">
          {/* <!-- Social buttons --> */}
          <ul className="list-unstyled list-inline text-center">
            <li className="list-inline-item">
              <a className="btn-floating mx-1">
                <FacebookIcon sx={{ color: "white" }} />
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating mx-1">
                <TwitterIcon sx={{ color: "white" }} />
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating mx-1">
                <GoogleIcon sx={{ color: "white" }} />
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating mx-1">
                <LinkedInIcon sx={{ color: "white" }} />
              </a>
            </li>
          </ul>
          {/* <!-- Social buttons --> */}
        </div>
        {/* <!-- Footer Elements --> */}

        {/* <!-- Copyright --> */}
        <div
          style={{
            background: "#1e282d",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="footer-copyright text-center py-3"
        >
          <Typography variant="p" sx={{fontSize:{xs:'12px',md:'16px'}}} >
            © 2020 Copyright :
            <span style={{ paddingLeft: "5px", color: "#ADD8E6" }}>
              Jawan Pakistan Hotel Management app
            </span>
          </Typography>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
      {/* <!-- Footer --> */}
    </>
  );
};

export default Footer;
