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

type Props = {};

function Header({}: Props) {
  const router = useRouter();
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const [isNavbarActive, setIsNavbarActive] = useState("home");
  const handleChangeLanguage = (lang: string) => {
    router.push("/", "/", { locale: lang });
  };

  const trans = useTrans();
  const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  const { data: session }: any = useSession();
  console.log(session);

  const WraperLangItem = styled("div", {
    display: "flex",
    alignItems: "center",
  });


  const handleChangeNavbar = (e: any) => {
    setIsNavbarActive(e);
  };
  return (
    <Nav variant="sticky" maxWidth="fluid" css={{zIndex: 999}}>
      <Nav.Toggle showIn="md" />
      <Nav.Brand
        hideIn="md"
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        <Image
          src="/image/logo.svg"
          alt="Evanloi blog avatar"
          width={100}
          height={76}
        />
      </Nav.Brand>
      <Nav.Content
        enableCursorHighlight
        activeColor="secondary"
        hideIn="md"
        variant="underline"
      >
        <Nav.Link
          aria-label={"home"}
          onClick={(e: any) => handleChangeNavbar(e.target.ariaLabel)}
          href="/"
          isActive={isNavbarActive === "home"}
        >
          {trans.home.navbar.home}
        </Nav.Link>
        <Nav.Link
          aria-label={"category"}
          key="navbar"
          onClick={(e: any) => console.log(e)}
          href="/admin/post"
          isActive={isNavbarActive === "category"}
        >
          {trans.home.navbar.category}
        </Nav.Link>
        <Nav.Link
          aria-label={"about"}
          href="/post/3"
          isActive={isNavbarActive === "about"}
        >
          {trans.home.navbar.about}
        </Nav.Link>
        <Nav.Link
          aria-label={"contact"}
          href="/post/5"
          isActive={isNavbarActive === "contact"}
        >
          {trans.home.navbar.contact}
        </Nav.Link>
      </Nav.Content>
      <Nav.Content>
        <Nav.Item
          css={{
            "@xsMax": {
              w: "100%",
              jc: "center",
            },
          }}
        >
          <Input
            clearable
            contentLeft={
              <HiMagnifyingGlass
                fill="var(--nextui-colors-accents6)"
                size={16}
              />
            }
            contentLeftStyling={false}
            css={{
              w: "100%",
              "@xsMax": {
                mw: "500px",
              },
              "& .nextui-input-content--left": {
                h: "100%",
                ml: "$4",
                dflex: "center",
              },
            }}
            placeholder="Search..."
          />
        </Nav.Item>
      </Nav.Content>
      <Nav.Content
        css={{
          "@xs": {
            w: "5%",
            jc: "flex-end",
          },
        }}
      >
        <Nav.Item hideIn="sm">
          <Dropdown>
            <Dropdown.Button
              flat
              color="secondary"
              css={{ tt: "capitalize", w: "10px !important" }}
            >
              {router.locale || "EN"}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single Language Option"
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
                  color="gradient"
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
              if (actionKey === "logout") {
                signOut();
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
            <Dropdown.Item key="settings" withDivider>
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
              Analytics
            </Dropdown.Item>
            <Dropdown.Item key="system">System</Dropdown.Item>
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              {trans.home.navbar.help_and_feedback}
            </Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
              {trans.home.navbar.logout}
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
