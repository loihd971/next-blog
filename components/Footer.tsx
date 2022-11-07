import React, { useMemo, useState } from "react";
import styles from "@/styles/Footer.module.scss";
import {
  Button,
  Container,
  Grid,
  red,
  styled,
  Text,
  Input,
  theme,
  useTheme,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import {
  FaGithub,
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPaperPlane,
  FaSlack,
  FaJsSquare,
  FaRegPaperPlane,
  FaFileDownload,
} from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import CustomSelect from "@/components/CustomSelect";
import { PHONE_CODE } from "@/utils/phoneCode";
import CustomPhoneInput, { StyledContactInput } from "@/components/CustomInput";
import { StyledContactTextarea } from "@/components/CustomeTextarea";
import axios from "axios";

type Props = {};

function Footer({}: Props) {
  const { isDark } = useTheme();

  const [inputs, setInputs] = useState<any>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isEdit, setIsEdit] = useState<any>([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const [form, setForm] = useState<any>("");

  // const downloadCv = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:3000/api/downloadPDF`);
  //     const code = res.status;
  //     if (code === 200) {
  //       const headers = res?.headers;
  //       const fileName = headers["content-disposition"]
  //         ?.split("filename=")[1]
  //         ?.split(";")[0] as any;
  //       const url = window.URL.createObjectURL(
  //         new Blob([res.data], {
  //           type: `${headers["content-type"]}`,
  //         })
  //       );
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", fileName);
  //       document.body.appendChild(link);
  //       link.click();
  //     }
  //   } catch (error) {
  //     console.log("error:", error);
  //   }
  // };

  const handleChange = (e: any) => {
    if (e) {
      setInputs((prev: any) => ({
        ...prev,
        [e?.target?.name]: e?.target?.value,
      }));
      setIsEdit((pre: any) => [...pre, e?.target?.name]);
    }
  };

  const nameError = useMemo(() => {
    if (!inputs?.name && (isEdit.includes("name") || isSubmit)) {
      return <Text color="error">{`Name is required`}</Text>;
    } else {
      return null;
    }
  }, [inputs.name, isSubmit]);

  const emailError = useMemo(() => {
    if (!inputs?.email && (isEdit.includes("email") || isSubmit)) {
      return <Text color="error">{`Email is required`}</Text>;
    } else {
      return null;
    }
  }, [inputs.email, isSubmit]);

  const phoneError = useMemo(() => {
    if (!inputs?.phone && (isEdit.includes("phone") || isSubmit)) {
      return <Text color="error">{`Phone is required`}</Text>;
    } else {
      return null;
    }
  }, [inputs.phone, isSubmit]);

  const messageError = useMemo(() => {
    if (!inputs?.message && (isEdit.includes("message") || isSubmit)) {
      return <Text color="error">{`Message is required`}</Text>;
    } else {
      return null;
    }
  }, [inputs.message, isSubmit]);

  const handleSendMail = async (e: any) => {
    setIsSubmit(true);

    if (inputs.name && inputs.email && inputs.message && inputs.phone) {
      setForm({ state: "loading" });
      try {
        const res = await fetch(`api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        });

        const { error } = await res.json();

        if (error) {
          toast.error(error);
          return;
        }

        toast.success("Your message was sent successfully!");
      } catch (error) {
        toast.error("Somethings went wrong!");
      } finally {
        setForm({ state: "done" });
      }
    }
  };

  return (
    <Grid.Container
      id="contact"
      gap={2}
      css={{
        minHeight: "calc(100vh - 76px)",
        height: "100%",
        backgroundImage: `${
          isDark
            ? 'url("/image/footer_dark.svg") !important'
            : 'url("/image/footer_light.svg") !important'
        } `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid.Container
        css={{
          marginTop: "50px !important",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        gap={2}
      >
        <Grid xs={12} sm={12} md={12} justify="center">
          <Text h6>Contact Me</Text>
        </Grid>

        <Grid>
          <Grid.Container gap={2} direction="column">
            <StyledContactInput
              name="name"
              bordered
              value={inputs.name}
              placeholder="Name"
              onChange={handleChange}
            />
            {nameError}
            <StyledContactInput
              name="email"
              type="email"
              bordered
              value={inputs.email}
              placeholder="Email"
              onChange={handleChange}
            />
            {emailError}
            <CustomPhoneInput
              defaultInputValue={inputs.phone}
              name="phone"
              defaultSelectValue="+84"
              onChange={handleChange}
            />
            {phoneError}
          </Grid.Container>
        </Grid>

        <Grid alignItems="flex-start">
          <StyledContactTextarea
            name="message"
            minRows={6}
            value={inputs.message}
            bordered
            placeholder="Message"
            onChange={handleChange}
          />
          {messageError}
        </Grid>
        <Grid xs={12} sm={12} md={12} justify="center">
          <Button
            css={{ width: "350px" }}
            color="secondary"
            type="submit"
            onClick={(e) => handleSendMail(e)}
          >
            <FaRegPaperPlane style={{ paddingRight: "5px", width: "100%" }} />
            {form.state === "loading" ? "Sending" : "Send"}
          </Button>
        </Grid>
      </Grid.Container>

      <Grid xs={12} sm={9} md={9} lg={9} xl={9}>
        <Grid.Container gap={2}>
          <Grid
            xs={12}
            sm={5}
            md={5}
            lg={5}
            xl={5}
            direction="column"
            // css={{ cursor: "poiter" }}
          >
            <Text h5>About</Text>
            <Text h6>Hi there!</Text>
            <Text h6>Welcome to my blog.</Text>
            <Text h6>
              This is a blog for everyone who has a passion for technology or
              simply finds humor.
            </Text>

            <div className={styles.footer__contact__icon}>
              <FaGithub className={styles.contact__icon} />{" "}
              <FaTwitter className={styles.contact__icon} />{" "}
              <FaFacebookSquare className={styles.contact__icon} />
              <FaSlack className={styles.contact__icon} />
              <Tooltip content={<Text h6>Download My Resume</Text>}>
                <a
                  href="/mycv.pdf"
                  download="mycv.pdf"
                  className={styles.downloadcv__section}
                >
                  <FaFileDownload
                    style={{ fill: theme.colors.accents9.computedValue }}
                    className={styles.downloadcv__section__icon}
                  />
                </a>
              </Tooltip>
            </div>
          </Grid>
          <Grid xs={12} sm={3} md={3} lg={3} xl={3} direction="column">
            <Text h5>Quick Links</Text>
            <div className={styles.footer__quick__link}>
              <ul>
                <Link href="#">
                  <Text h6>Home</Text>
                </Link>
                <Link href="#">
                  <Text h6>About</Text>
                </Link>
                <Link href="#">
                  <Text h6>Services</Text>
                </Link>
                <Link href="#">
                  <Text h6>Works</Text>
                </Link>
                <Link href="#">
                  <Text h6>Contact</Text>
                </Link>
              </ul>
            </div>
          </Grid>
          <Grid xs={12} sm={4} md={4} lg={4} xl={4} direction="column">
            <Text h5>Have a question?</Text>
            <div className={styles.footer__quick__location}>
              <Text h6>
                <FaMapMarkerAlt className={styles.link__icon} />
                CT6C Xa La, Buou Bridge St., Tan Trieu, Thanh Tri, Ha Noi,
                Vietnam
              </Text>
              <Text h6>
                <FaPhoneAlt className={styles.link__icon} />
                0342429911
              </Text>
              <Text h6>
                <FaPaperPlane className={styles.link__icon} />
                loihd971@gmail.com
              </Text>
            </div>
          </Grid>
        </Grid.Container>
      </Grid>
      <Grid xs={12} sm={3} md={3} lg={3} xl={3} css={{ height: "237px" }}>
        <div className={styles.footer__logo__container}>
          <FaJsSquare className={styles.footer__logo} />
          <Text h6>EvanLoi | &#169; 2022 VN, Inc. All rights reserved</Text>
        </div>
      </Grid>
    </Grid.Container>
  );
}

export default Footer;
