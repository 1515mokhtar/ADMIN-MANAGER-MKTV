import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "eCommerce",
            url: "/",
            icon: Icons.HomeIcon,
          },
          {
            title: "Movies",
            url: "/movies",
            icon: Icons.HomeIcon,
          },
          {
            title: "Movie Search",
            url: "/movies/search",
            icon: Icons.Alphabet,
            items: [],
          },
        ],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Tables",
        url: "/tables",
        icon: Icons.Table,
        items: [
          {
            title: "Tables",
            url: "/tables",
            icon: Icons.Table,
          },
        ],
      },
      {
        title: "Pages",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Settings",
            url: "/pages/settings",
            icon: Icons.Alphabet,
          },
        ],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Charts",
        icon: Icons.PieChart,
        items: [
          {
            title: "Basic Chart",
            url: "/charts/basic-chart",
            icon: Icons.PieChart,
          },
        ],
      },
      {
        title: "UI Elements",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Alerts",
            url: "/ui-elements/alerts",
            icon: Icons.FourCircle,
          },
          {
            title: "Buttons",
            url: "/ui-elements/buttons",
            icon: Icons.FourCircle,
          },
        ],
      }
    ],
  },
];
