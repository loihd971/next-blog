import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Navbar as Nav,
  Link,
  Text,
  Dropdown,
  Avatar,
  Switch,
  useTheme,
  Input,
  Button,
  styled,
  globalCss,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { HiSun, HiMoon, HiMagnifyingGlass } from "react-icons/hi2";
import Image from "next/image";
import useTrans from "@/utils/useTranslate.js";
import { Language } from "@/utils/sharedType";
import { useRouter } from "next/router";
import { getLocalStorage, setLocalStorage } from "@/services/localStorage";
import { FaJsSquare } from "react-icons/fa";
import styles from "@/styles/Header.module.scss";
import CustomSearchBar from "@/components/CustomSearchBar";
type Props = {};

function Header({}: Props) {
  const router = useRouter();
  const { setTheme } = useNextTheme();
  const { isDark, type, theme } = useTheme();
  const [isTop, setIsTop] = useState(false);
  const [isPress, setIsPress] = useState(0);

  const [isNavbarActive, setIsNavbarActive] = useState("home");
  const handleChangeLanguage = (lang: string) => {
    router.push("/", "/", { locale: lang });
    setIsNavbarActive("home");
  };

  // useEffect(() => {
  //   if (isPress !== 0) {
  //     router.push("/", "/", { locale: router.locale });
  //   }
  // }, [isPress]);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 150) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    };

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  const trans = useTrans();
  const collapseItems = [
    "Home",
    "About",
    "Service",
    "Contact",
    "Help & Feedback",
    "Log Out",
  ];
  const { data: session }: any = useSession();

  const WraperLangItem = styled("div", {
    display: "flex",
    alignItems: "center",
  });

  // useEffect(() => {
  //   if (router?.pathname?.includes("manage")) {
  //     setIsNavbarActive("manage");
  //   } else if (router?.pathname?.includes("about")) {
  //     setIsNavbarActive("about");
  //   }
  // }, [router?.pathname]);

  const handleChangeNavbar = (e: any) => {
    setIsNavbarActive(e);
  };
  return (
    <Nav
      variant="sticky"
      maxWidth="fluid"
      css={{ zIndex: 999, background: theme?.colors.red900.value }}
    >
      <Nav.Toggle showIn="sm" />
      <Nav.Brand hideIn="sm">
        <FaJsSquare className={styles.logo} />
        <Text h6 css={{ paddingLeft: "5px", paddingTop: "7px" }}>
          EvanLoi
        </Text>
      </Nav.Brand>
      <Nav.Content
        enableCursorHighlight
        activeColor="secondary"
        hideIn="sm"
        variant="underline-rounded"
      >
        <Nav.Link
          aria-label={"home"}
          onClick={(e: any) => handleChangeNavbar(e.target.ariaLabel)}
          href={`/${router.locale}`}
          isActive={isNavbarActive === "home"}
        >
          {trans.home.navbar.home}
        </Nav.Link>
        {session?.user?.id && (
          <Nav.Link
            aria-label={"manage"}
            key="navbar"
            onClick={(e: any) => handleChangeNavbar(e.target.ariaLabel)}
            href={`/${router.locale}/manage/post`}
            isActive={isNavbarActive === "manage"}
          >
            {trans.home.navbar.services}
          </Nav.Link>
        )}

        <Nav.Link
          aria-label={"about"}
          href="#about"
          isActive={isNavbarActive === "about"}
          onClick={(e: any) => handleChangeNavbar(e.target.ariaLabel)}
        >
          {trans.home.navbar.about}
        </Nav.Link>

        <Nav.Link
          aria-label={"contact"}
          onClick={(e: any) => handleChangeNavbar(e.target.ariaLabel)}
          href="#contact"
          isActive={isNavbarActive === "contact"}
        >
          {trans.home.navbar.contact}
        </Nav.Link>
      </Nav.Content>

      <Nav.Content
        css={{
          "@xs": {
            w: "5%",
            jc: "flex-end",
          },
        }}
      >
        <CustomSearchBar />
        <Nav.Item hideIn="md">
          <Dropdown>
            <Dropdown.Button
              flat
              color="secondary"
              css={{ tt: "capitalize", w: "10px !important" }}
            >
              {router.locale || "EN"}
            </Dropdown.Button>
            <Dropdown.Menu
              // aria-label="Single Language Option"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={getLocalStorage("lang") || Language.en}
              onSelectionChange={(keys: any) => {
                const lang = Object.values(keys)[0] as string;
                setLocalStorage("lang", lang);
                handleChangeLanguage(lang);
              }}
            >
              <Dropdown.Item key="en">
                <WraperLangItem>
                  <Image
                    src="/image/american_flag.png"
                    alt="American flag mmultilanguage"
                    width={30}
                    height={20}
                  />
                  <Text size="$md" css={{ marginLeft: "15px" }}>
                    English
                  </Text>
                </WraperLangItem>
              </Dropdown.Item>
              <Dropdown.Item key="vi">
                <WraperLangItem>
                  <Image
                    src="/image/vietnamese_flag.png"
                    alt="Vietnamese flag mmultilanguage"
                    width={30}
                    height={20}
                  />
                  <Text size="$md" css={{ marginLeft: "15px" }}>
                    Vietnamese
                  </Text>
                </WraperLangItem>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
        <Switch
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          checked={isDark}
          size="sm"
          color="warning"
          iconOn={<HiMoon />}
          iconOff={<HiSun />}
        />

        <Dropdown placement="bottom-right">
          {session ? (
            <Nav.Item>
              <Dropdown.Trigger>
                <Avatar
                  pointer
                  size="lg"
                  src={session?.user?.image}
                  color="secondary"
                  bordered
                />
              </Dropdown.Trigger>
            </Nav.Item>
          ) : (
            <Nav.Content>
              <Nav.Link color="inherit" href="#" onClick={() => signIn()}>
                {trans.home.navbar.login}
              </Nav.Link>
              <Nav.Item>
                <Button auto flat as={Link} color="secondary" href="#">
                  {trans.home.navbar.signup}
                </Button>
              </Nav.Item>
            </Nav.Content>
          )}

          <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={(actionKey) => {
              console.log(actionKey);

              if (actionKey === "logout") {
                signOut();
                setIsPress(Math.random());
              }
            }}
          >
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                {trans.home.navbar.sign_in_as}
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                {session?.user?.email}
              </Text>
            </Dropdown.Item>

            <Dropdown.Item key="about">
              <Link
                href={`/${router.locale}/about-me/${session?.user?.id}`}
                style={{ color: theme?.colors?.accents9.value, width: "100%" }}
              >
                About me
              </Link>
            </Dropdown.Item>
            <Dropdown.Item key="service" withDivider>
              <a
                href="/mycv.pdf"
                download="mycv.pdf"
                style={{ color: theme?.colors?.accents9.value }}
              >
                Download My Resume
              </a>
            </Dropdown.Item>
            <Dropdown.Item key="contact">Contact</Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
              <Link
                href={`/${router.locale}`}
                style={{ color: theme?.colors?.accents9.value, width: "100%" }}
              >
                {trans.home.navbar.logout}
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Content>
      <Nav.Collapse>
        {collapseItems.map((item, index) => (
          <Nav.CollapseItem
            key={item}
            activeColor="secondary"
            css={{
              color: index === collapseItems.length - 1 ? "$error" : "",
            }}
            isActive={index === 2}
          >
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="#"
            >
              {item}
            </Link>
          </Nav.CollapseItem>
        ))}
      </Nav.Collapse>
    </Nav>
  );
}

export default Header;
