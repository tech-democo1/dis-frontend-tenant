import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, useNavigate, useLocation, NavLink } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import React__default, { createElement, useState, useMemo } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon, ChevronDownIcon, CheckIcon, ChevronUpIcon, ArrowUpDown, Printer, Search, MessageCircle, ChevronRight, ChevronLeft, Plus } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useReactTable, getPaginationRowModel, getSortedRowModel, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { DayPicker } from "react-day-picker";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const sidebarItems = [
  {
    id: 1,
    icon: "/assets/icons/home.svg",
    label: "Dashboard",
    href: "/dashboard"
  },
  {
    id: 3,
    icon: "/assets/icons/users.svg",
    label: "Employer",
    href: "/employerList"
  }
];
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", children: [
            /* @__PURE__ */ jsx(XIcon, {}),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
const CreateEmployerProfileModal = ({
  open,
  onClose,
  title = "Create Employer Profile",
  children,
  footer
}) => {
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: (open2) => !open2 && onClose(), children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-5xl w-full", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: title }) }),
    /* @__PURE__ */ jsx("div", { className: "max-h-[80vh] overflow-y-auto", children }),
    footer && /* @__PURE__ */ jsx(DialogFooter, { children: footer })
  ] }) });
};
function EmployerProfileForm() {
  return /* @__PURE__ */ jsx("form", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("label", { className: "block font-semibold", children: [
        "HKID ",
        /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: "border px-2 py-1 rounded w-full",
          defaultValue: "Z683365(5)"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("label", { className: "block font-semibold", children: [
        "Chinese Name ",
        /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsx("input", { type: "text", className: "border px-2 py-1 rounded w-full" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("label", { className: "block font-semibold", children: [
        "English Surname ",
        /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: "border px-2 py-1 rounded w-full",
          placeholder: "Surname"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("label", { className: "block font-semibold", children: [
        "English Given Names ",
        /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: "border px-2 py-1 rounded w-full",
          placeholder: "Given Names",
          defaultValue: "Wing Ching"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block font-semibold", children: "Date of Birth" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "date",
          className: "border px-2 py-1 rounded w-full",
          defaultValue: "1985-06-03"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block font-semibold", children: "Gender" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-2", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              name: "gender",
              value: "female",
              className: "mr-2"
            }
          ),
          " ",
          "Female"
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("input", { type: "radio", name: "gender", value: "male", className: "mr-2" }),
          " ",
          "Male"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("label", { className: "block font-semibold", children: [
        "Mobile Phone ",
        /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsx("input", { type: "text", className: "border px-2 py-1 rounded w-full" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block font-semibold", children: "Email Address" }),
      /* @__PURE__ */ jsx("input", { type: "email", className: "border px-2 py-1 rounded w-full" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("label", { className: "block font-semibold", children: [
        "Preferred language ",
        /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsxs("select", { className: "border px-2 py-1 rounded w-full", children: [
        /* @__PURE__ */ jsx("option", { value: "na", children: "-- Please Select --" }),
        /* @__PURE__ */ jsx("option", { value: "english", children: "English" }),
        /* @__PURE__ */ jsx("option", { value: "chinese", children: "Chinese" })
      ] })
    ] })
  ] }) });
}
const employers = [
  {
    hkid: "A123456(7)",
    name: "John Chan",
    phone: "91234567"
  },
  {
    hkid: "B765432(1)",
    name: "Mary Lee",
    phone: "98765432"
  }
  // ...more records
];
const AdminLayout = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const suggestions = employers.filter((emp) => emp.hkid.toLowerCase().includes(search.toLowerCase()) || emp.name.toLowerCase().includes(search.toLowerCase()) || emp.phone.includes(search));
  return /* @__PURE__ */ jsxs("div", {
    className: "flex h-screen w-full",
    children: [/* @__PURE__ */ jsxs("aside", {
      className: "w-64 bg-white border-r border-gray-200 flex flex-col py-8 px-4 min-h-screen",
      children: [/* @__PURE__ */ jsx("div", {
        className: "mb-10",
        children: /* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-800",
          children: "Doc Management System"
        })
      }), /* @__PURE__ */ jsx("nav", {
        className: "flex flex-col gap-2",
        children: sidebarItems.map((item) => /* @__PURE__ */ jsxs(NavLink, {
          to: item.href,
          className: ({
            isActive
          }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive ? "bg-primary-100 text-white" : "text-gray-700 hover:bg-primary-50 hover:text-primary-500"}`,
          end: true,
          children: [item.icon && /* @__PURE__ */ jsx("img", {
            src: item.icon,
            alt: "",
            className: "w-5 h-5"
          }), item.label]
        }, item.id))
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex-1 flex flex-col bg-light-200 h-full",
      children: [/* @__PURE__ */ jsxs("header", {
        className: "sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-4",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "relative w-full",
          children: [/* @__PURE__ */ jsx("input", {
            type: "text",
            value: search,
            onChange: (e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            },
            onBlur: () => setTimeout(() => setShowSuggestions(false), 100),
            placeholder: "Quick search for Employer's HKID / Name / Phone Number...",
            className: "flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-base bg-light-100 w-full"
          }), showSuggestions && search && suggestions.length > 0 && /* @__PURE__ */ jsx("ul", {
            className: "absolute left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 z-20 max-h-48 overflow-auto",
            children: suggestions.map((emp, idx) => /* @__PURE__ */ jsxs("li", {
              className: "px-4 py-2 hover:bg-primary-50 cursor-pointer",
              onMouseDown: () => {
                setSearch(emp.name);
                setShowSuggestions(false);
              },
              children: [emp.name, " (", emp.hkid, ") - ", emp.phone]
            }, idx))
          })]
        }), /* @__PURE__ */ jsx("button", {
          className: "bg-primary-100 text-white px-6 py-2 rounded-lg font-semibold shadow-sm hover:bg-primary-500 transition-colors",
          onClick: () => {
            if (location.pathname !== "/employerList") {
              navigate(`/employerList?search=${encodeURIComponent(search)}`);
            } else {
              navigate(`/employerList?search=${encodeURIComponent(search)}`, {
                replace: true
              });
            }
          },
          children: "Search"
        }), /* @__PURE__ */ jsx("button", {
          className: "bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-sm hover:bg-blue-600 transition-colors",
          onClick: () => setModalOpen(true),
          children: "Create Employer Profile"
        })]
      }), /* @__PURE__ */ jsx("main", {
        className: "flex-1 p-8 overflow-auto",
        children: /* @__PURE__ */ jsx(Outlet, {})
      }), /* @__PURE__ */ jsx(CreateEmployerProfileModal, {
        open: modalOpen,
        onClose: () => setModalOpen(false),
        title: "Create Employer Profile",
        footer: /* @__PURE__ */ jsx("button", {
          className: "btn btn-primary",
          children: "Save"
        }),
        children: /* @__PURE__ */ jsx(EmployerProfileForm, {})
      })]
    })]
  });
};
const adminLayout = withComponentProps(AdminLayout);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: adminLayout
}, Symbol.toStringTag, { value: "Module" }));
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Root,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    }
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Progress({ className, barClassName, value, ...props }) {
  return /* @__PURE__ */ jsx(
    ProgressPrimitive.Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ProgressPrimitive.Indicator,
        {
          "data-slot": "progress-indicator",
          className: cn(
            "bg-primary h-full w-full flex-1 transition-all",
            barClassName
          ),
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
function PrintStatusProgressBar({
  status
}) {
  const statusMap = {
    "missing mandatory data": {
      value: 33,
      color: "bg-red-500",
      tooltip: "Missing mandatory data"
    },
    "proofs document missing": {
      value: 66,
      color: "bg-yellow-500",
      tooltip: "Proofs document missing"
    },
    "all collected": {
      value: 100,
      color: "bg-green-500",
      tooltip: "All documents collected"
    }
  };
  const { value, color, tooltip } = statusMap[status] ?? {
    value: 0,
    color: "bg-gray-300",
    tooltip: "Unknown status"
  };
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 w-32 cursor-pointer", children: /* @__PURE__ */ jsx(Progress, { value, className: "w-full", barClassName: color }) }) }),
    /* @__PURE__ */ jsx(TooltipContent, { side: "top", children: /* @__PURE__ */ jsx("span", { className: "text-xs", children: tooltip }) })
  ] }) });
}
const columns$3 = [
  {
    accessorKey: "workerType",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Worker Type",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "employerName",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Employer's Name",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "employerPhone",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Employer's Phone",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "helperName",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Helper's Name",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "helperCode",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Helper's Code",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "depositPaidDate",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Deposit Paid Date",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "printStatus",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Status",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: /* @__PURE__ */ jsx(PrintStatusProgressBar, { status: row.original.printStatus }) }),
    sortingFn: (a, b) => {
      const order = [
        "missing mandatory data",
        "proofs document missing",
        "all collected"
      ];
      return order.indexOf(a.getValue("printStatus")) - order.indexOf(b.getValue("printStatus"));
    }
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pl-2", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: "outline",
          onClick: () => {
          },
          children: /* @__PURE__ */ jsx(Printer, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: "outline",
          onClick: () => {
            alert(`View more for ${row.original.id}`);
          },
          children: /* @__PURE__ */ jsx(Search, { className: "w-4 h-4" })
        }
      )
    ] })
  }
];
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCaption({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "caption",
    {
      "data-slot": "table-caption",
      className: cn("text-muted-foreground mt-4 text-sm", className),
      ...props
    }
  );
}
function DataTable({
  columns: columns2,
  data
}) {
  var _a;
  const [sorting, setSorting] = React.useState([]);
  const table = useReactTable({
    data,
    columns: columns2,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting
    }
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => {
        return /* @__PURE__ */ jsx(TableHead, { children: header.isPlaceholder ? null : flexRender(
          header.column.columnDef.header,
          header.getContext()
        ) }, header.id);
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          ) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns2.length,
          className: "h-24 text-center",
          children: "No results."
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: "Next"
        }
      )
    ] })
  ] });
}
function getData$3() {
  return [
    {
      id: "1",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      workerType: "OVERSEA",
      employerName: "John Doe",
      employerPhone: "123-456-7890",
      helperName: "May",
      helperCode: "C123",
      depositPaidDate: "13/3/2024",
      printStatus: "all collected"
    },
    {
      id: "2",
      amount: 300,
      status: "success",
      email: "a@example.com",
      workerType: "OVERSEA-EXHK",
      employerName: "WONG WAI",
      employerPhone: "98765432",
      helperName: "Amy",
      helperCode: "C123",
      depositPaidDate: "13/2/2024",
      printStatus: "proofs document missing"
    },
    {
      id: "3",
      amount: 200,
      status: "success",
      email: "b@example.com",
      workerType: "OVERSEA",
      employerName: "CHAN WAI",
      employerPhone: "98765432",
      helperName: "Susan",
      helperCode: "C123",
      depositPaidDate: "13/6/2024",
      printStatus: "all collected"
    },
    {
      id: "4",
      amount: 150,
      status: "pending",
      email: "c@example.com",
      workerType: "OVERSEA-EXHK",
      employerName: "LEE MING",
      employerPhone: "91234567",
      helperName: "Helen",
      helperCode: "C456",
      depositPaidDate: "10/5/2024",
      printStatus: "missing mandatory data"
    }
    // ...add more records as needed
  ];
}
function printTab() {
  const data = getData$3();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "1rem" }, children: [
      /* @__PURE__ */ jsx("h3", { children: "Document Set: " }),
      /* @__PURE__ */ jsxs(Select, { children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Immigration Set" }) }),
        /* @__PURE__ */ jsx(SelectContent, { children: /* @__PURE__ */ jsx(SelectItem, { value: "immiSet", children: "Immigration Set" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full py-4", children: /* @__PURE__ */ jsx(DataTable, { columns: columns$3, data }) })
  ] });
}
const columns$2 = [
  {
    accessorKey: "workerType",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Worker Type",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "employerName",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Employer's Name",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "employerPhone",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Employer's Phone",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "helperName",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Helper's Name",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "depositPaidDate",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Deposit Paid Date",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "missingDocCount",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Number of Missing Doc/info",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: function MissingDocCell({ row, getValue }) {
      const count = getValue();
      const missingList = row.original.missingDocList || [];
      const employerPhone = row.original.employerPhone;
      const phone = employerPhone.replace(/[^0-9]/g, "");
      const message = `Dear ${row.original.employerName},

The following documents/info are missing:
${missingList.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

Please provide them as soon as possible. Thank you!`;
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
        message
      )}`;
      const [open, setOpen] = useState(false);
      const handleCopy = () => {
        navigator.clipboard.writeText(message);
      };
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 px-4 py-2 min-w-[90px] cursor-pointer", children: [
            /* @__PURE__ */ jsx("span", { className: "underline decoration-dotted", children: count }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  setOpen(true);
                },
                className: count === 0 ? "pointer-events-none opacity-50" : "",
                tabIndex: count === 0 ? -1 : 0,
                "aria-disabled": count === 0,
                children: /* @__PURE__ */ jsx(MessageCircle, { className: "text-green-500 w-5 h-5 hover:scale-110 transition" })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(TooltipContent, { side: "top", children: /* @__PURE__ */ jsx("div", { className: "whitespace-pre-line text-xs", children: missingList.length ? missingList.join("\n") : "No missing document" }) })
        ] }) }),
        /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "w-[600px]", children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Send Missing Document Message" }) }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              className: "w-full border rounded p-2 text-sm",
              rows: 6,
              value: message,
              readOnly: true
            }
          ),
          /* @__PURE__ */ jsxs(DialogFooter, { className: "flex justify-between items-center mt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  onClick: () => {
                    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                  },
                  disabled: count === 0,
                  children: "Send to WhatsApp"
                }
              ),
              /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: handleCopy, children: "Copy" })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                onClick: () => setOpen(false),
                children: "Close"
              }
            )
          ] })
        ] }) })
      ] });
    },
    sortingFn: "alphanumeric"
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "flex gap-2 pl-2", children: /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: "outline",
        onClick: () => {
          alert(`View more for ${row.original.employerName}`);
        },
        children: /* @__PURE__ */ jsx(Search, { className: "w-4 h-4" })
      }
    ) })
  }
];
function getData$2() {
  return [
    {
      workerType: "OVERSEA",
      employerName: "John Doe",
      employerPhone: "123-456-7890",
      helperName: "May",
      depositPaidDate: "13/3/2024",
      missingDocCount: 2,
      missingDocList: ["Passport", "Visa"]
      // Example missing documents
    },
    {
      workerType: "OVERSEA-EXHK",
      employerName: "WONG WAI",
      employerPhone: "98765432",
      helperName: "Amy",
      depositPaidDate: "13/2/2024",
      missingDocCount: 1,
      missingDocList: ["Medical Report"]
      // Example missing document
    },
    {
      workerType: "OVERSEA",
      employerName: "CHAN WAI",
      employerPhone: "98765432",
      helperName: "Susan",
      depositPaidDate: "13/6/2024",
      missingDocCount: 0,
      missingDocList: []
      // No missing documents
    }
  ];
}
function MissingDocumentTab() {
  const data = getData$2();
  return /* @__PURE__ */ jsx("div", { className: "w-full py-4", children: /* @__PURE__ */ jsx(DataTable, { columns: columns$2, data }) });
}
const columns$1 = [
  {
    accessorKey: "workerType",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Worker Type",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "employerName",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Employer's Name",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "code",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Code",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "helperName",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Helper's Name",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "visaExpiryDate",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Visa Expiry Date",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "passportExpiryDate",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Passport Expiry Date",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "flex gap-2 pl-2", children: /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: "outline",
        onClick: () => {
          alert(`View more for ${row.original.employerName}`);
        },
        children: /* @__PURE__ */ jsx(Search, { className: "w-4 h-4" })
      }
    ) })
  }
];
function getData$1() {
  return [
    {
      workerType: "OVERSEA",
      employerName: "John Doe",
      code: "123-456-7890",
      helperName: "May",
      visaExpiryDate: "13/3/2024",
      passportExpiryDate: "13/3/2024"
    },
    {
      workerType: "OVERSEA-EXHK",
      employerName: "WONG WAI",
      code: "98765432",
      helperName: "Amy",
      visaExpiryDate: "13/2/2024",
      passportExpiryDate: "13/2/2024"
    },
    {
      workerType: "OVERSEA",
      employerName: "CHAN WAI",
      code: "98765432",
      helperName: "Susan",
      visaExpiryDate: "13/6/2024",
      passportExpiryDate: "13/6/2024"
    }
  ];
}
function UpdatePassportTab() {
  const data = getData$1();
  return /* @__PURE__ */ jsx("div", { className: "w-full py-4", children: /* @__PURE__ */ jsx(DataTable, { columns: columns$1, data }) });
}
const quickAccessTables = () => {
  const printData = useMemo(() => getData$3(), []);
  const missingDocData = useMemo(() => getData$2(), []);
  const updatePassportData = useMemo(() => getData$1(), []);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "print", className: "w-full", children: [
    /* @__PURE__ */ jsxs(TabsList, { className: "w-[1000px]", children: [
      /* @__PURE__ */ jsxs(TabsTrigger, { value: "print", children: [
        "Print",
        /* @__PURE__ */ jsx("span", { className: "ml-2 bg-gray-200 rounded-full px-2 text-xs", children: printData.length })
      ] }),
      /* @__PURE__ */ jsxs(TabsTrigger, { value: "missingDoc", children: [
        "Missing Document",
        /* @__PURE__ */ jsx("span", { className: "ml-2 bg-gray-200 rounded-full px-2 text-xs", children: missingDocData.length })
      ] }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "visaUpload", children: "Visa Update" }),
      /* @__PURE__ */ jsxs(TabsTrigger, { value: "uploadPassport", children: [
        "Update New Passport",
        /* @__PURE__ */ jsx("span", { className: "ml-2 bg-gray-200 rounded-full px-2 text-xs", children: updatePassportData.length })
      ] }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "uploadExtendVisa", children: "Upload Extend Visa After Renew Passport" })
    ] }),
    /* @__PURE__ */ jsx(TabsContent, { value: "print", children: /* @__PURE__ */ jsx(printTab, {}) }),
    /* @__PURE__ */ jsx(TabsContent, { value: "missingDoc", children: /* @__PURE__ */ jsx(MissingDocumentTab, {}) }),
    /* @__PURE__ */ jsx(TabsContent, { value: "visaUpload" }),
    /* @__PURE__ */ jsx(TabsContent, { value: "uploadPassport", children: /* @__PURE__ */ jsx(UpdatePassportTab, {}) }),
    /* @__PURE__ */ jsx(TabsContent, { value: "uploadExtendVisa", children: "Upload your extended visa after renewing your passport here." })
  ] }) });
};
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range" ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md" : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end: "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        IconLeft: ({ className: className2, ...props2 }) => /* @__PURE__ */ jsx(ChevronLeft, { className: cn("size-4", className2), ...props2 }),
        IconRight: ({ className: className2, ...props2 }) => /* @__PURE__ */ jsx(ChevronRight, { className: cn("size-4", className2), ...props2 })
      },
      ...props
    }
  );
}
const reminders = {
  "2025-05-25": [
    {
      workerType: "OVERSEA",
      workerCode: "T1222",
      employerName: "Eric Wong",
      employerMobile: "96385741",
      helperName: "Pauline",
      notesDetail: "Want to renew visa"
    },
    {
      workerType: "DIRECT",
      workerCode: "O2782",
      employerName: "Carol Ng",
      employerMobile: "75876766",
      helperName: "Daisy",
      notesDetail: "want to terminate contract"
    }
  ],
  "2025-05-26": [
    {
      workerType: "OVERSEA",
      workerCode: "T23141",
      employerName: "May Chan",
      employerMobile: "86774445",
      helperName: "Susan",
      notesDetail: "/"
    }
  ]
  // ...add more dates and reminders as needed
};
function formatDate(date) {
  const d = date ?? /* @__PURE__ */ new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
const dailyReminder = () => {
  const [date, setDate] = React__default.useState(/* @__PURE__ */ new Date());
  const selectedDate = formatDate(date);
  const todayReminders = reminders[selectedDate] || [];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "1rem",
        alignItems: "start"
        // ensures both columns align to the top
      },
      children: [
        /* @__PURE__ */ jsx("div", { style: { width: "100%", minHeight: "300px" }, children: /* @__PURE__ */ jsxs(Table, { style: { width: "100%" }, children: [
          /* @__PURE__ */ jsx(TableCaption, { children: todayReminders.length > 0 ? `Reminders for ${selectedDate}` : `No reminders for ${selectedDate}` }),
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { className: "w-[100px]", children: "Worker Type" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Worker Code" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Employer Name" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Employer Mobile" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Helper Name" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Notes Detail" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: todayReminders.length > 0 ? todayReminders.map((reminder) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: reminder.workerType }),
            /* @__PURE__ */ jsx(TableCell, { children: reminder.workerCode }),
            /* @__PURE__ */ jsx(TableCell, { children: reminder.employerName }),
            /* @__PURE__ */ jsx(TableCell, { children: reminder.employerMobile }),
            /* @__PURE__ */ jsx(TableCell, { children: reminder.helperName }),
            /* @__PURE__ */ jsx(TableCell, { children: reminder.notesDetail }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => {
                  alert(`View more for ${reminder.employerName}`);
                },
                children: /* @__PURE__ */ jsx(Search, { className: "w-4 h-4" })
              }
            ) })
          ] }, reminder.workerType)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
            TableCell,
            {
              colSpan: 7,
              className: "text-center py-8 text-gray-400",
              children: "No reminders for this date."
            }
          ) }) })
        ] }) }),
        /* @__PURE__ */ jsx(
          Calendar,
          {
            mode: "single",
            selected: date,
            onSelect: setDate,
            className: "rounded-md border"
          }
        )
      ]
    }
  );
};
const dashboard = () => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem"
      },
      children: [/* @__PURE__ */ jsxs(Card, {
        children: [/* @__PURE__ */ jsx(CardHeader, {
          children: /* @__PURE__ */ jsx(CardTitle, {
            children: "System News"
          })
        }), /* @__PURE__ */ jsx(CardContent, {
          children: /* @__PURE__ */ jsx("p", {
            children: "TODO"
          })
        })]
      }), /* @__PURE__ */ jsxs(Card, {
        children: [/* @__PURE__ */ jsx(CardHeader, {
          children: /* @__PURE__ */ jsx(CardTitle, {
            children: "Weather Card"
          })
        }), /* @__PURE__ */ jsx(CardContent, {
          children: /* @__PURE__ */ jsx("p", {
            children: "TODO"
          })
        })]
      })]
    }), /* @__PURE__ */ jsx(Card, {
      style: {
        marginTop: "2rem"
      },
      children: /* @__PURE__ */ jsx(CardContent, {
        children: /* @__PURE__ */ jsx(dailyReminder, {})
      })
    }), /* @__PURE__ */ jsxs(Card, {
      style: {
        marginTop: "2rem"
      },
      children: [/* @__PURE__ */ jsx(CardHeader, {
        children: /* @__PURE__ */ jsx(CardTitle, {
          children: "Quick Access"
        })
      }), /* @__PURE__ */ jsx(CardContent, {
        children: /* @__PURE__ */ jsx(quickAccessTables, {})
      })]
    })]
  });
};
const index$2 = withComponentProps(dashboard);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$2
}, Symbol.toStringTag, { value: "Module" }));
const columns = [
  {
    accessorKey: "employerName",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Employer's Name",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "employerPhone",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Employer's Phone",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    accessorKey: "latestStatus",
    header: ({ column }) => /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: [
          "Latest Status",
          /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
        ]
      }
    ),
    cell: ({ getValue }) => /* @__PURE__ */ jsx("div", { className: "pl-2", children: String(getValue()) }),
    sortingFn: "alphanumeric"
  },
  {
    id: "actions",
    header: "",
    cell: function ActionCell({
      row
    }) {
      const navigate = useNavigate();
      return /* @__PURE__ */ jsx("div", { className: "flex gap-2 pl-2", children: /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: "outline",
          onClick: () => {
            navigate("/employer", { replace: true });
          },
          children: /* @__PURE__ */ jsx(Search, { className: "w-4 h-4" })
        }
      ) });
    }
  }
];
function getData() {
  return [
    {
      employerName: "John Doe",
      employerPhone: "123-456-7890",
      latestStatus: "C123"
    },
    {
      employerName: "WONG WAI",
      employerPhone: "98765432",
      latestStatus: "proofs document missing"
    },
    {
      employerName: "CHAN WAI",
      employerPhone: "98765432",
      latestStatus: "all collected"
    },
    {
      employerName: "LEE MING",
      employerPhone: "91234567",
      latestStatus: "missing mandatory data"
    }
    // ...add more records as needed
  ];
}
const Index = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  params.get("search") || "";
  const data = getData();
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(Card, {
      className: "h-[600px]",
      children: /* @__PURE__ */ jsx(CardContent, {
        children: /* @__PURE__ */ jsx("div", {
          className: "w-full py-4",
          children: /* @__PURE__ */ jsx(DataTable, {
            columns,
            data
          })
        })
      })
    })
  });
};
const index$1 = withComponentProps(Index);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$1,
  getData
}, Symbol.toStringTag, { value: "Module" }));
const initialEmployer = {
  name: "John Doe",
  phone: "123-456-7890",
  address: "123 Main St, Hong Kong"
};
const initialHelpers = [{
  id: "h1",
  name: "May Chan",
  code: "C123",
  status: "Active",
  period: "2023-01-01 to 2025-01-01"
}, {
  id: "h2",
  name: "Susan Lee",
  code: "C456",
  status: "Completed",
  period: "2021-01-01 to 2023-01-01"
}];
const index = withComponentProps(function EmployerProfile() {
  const [helpers, setHelpers] = useState(initialHelpers);
  const [tab, setTab] = useState("employer");
  const [employer, setEmployer] = useState(initialEmployer);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState(employer);
  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };
  const handleSave = () => {
    setEmployer(editForm);
    setEditing(false);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "flex gap-6",
    children: [/* @__PURE__ */ jsxs(Card, {
      className: "max-w-3xl w-full",
      children: [/* @__PURE__ */ jsx(CardHeader, {
        children: /* @__PURE__ */ jsx(CardTitle, {
          children: "Employer Profile"
        })
      }), /* @__PURE__ */ jsx(CardContent, {
        children: /* @__PURE__ */ jsxs(Tabs, {
          value: tab,
          onValueChange: setTab,
          className: "w-full",
          children: [/* @__PURE__ */ jsxs(TabsList, {
            children: [/* @__PURE__ */ jsx(TabsTrigger, {
              value: "employer",
              children: "Employer Info"
            }), helpers.map((helper) => /* @__PURE__ */ jsx(TabsTrigger, {
              value: helper.id,
              children: helper.name
            }, helper.id)), /* @__PURE__ */ jsxs(TabsTrigger, {
              value: "add-helper",
              className: "flex items-center",
              children: [/* @__PURE__ */ jsx(Plus, {
                className: "w-4 h-4 mr-1"
              }), " Add Helper"]
            })]
          }), /* @__PURE__ */ jsx(TabsContent, {
            value: "employer",
            children: /* @__PURE__ */ jsx("div", {
              className: "space-y-2 py-4",
              children: editing ? /* @__PURE__ */ jsxs(Fragment, {
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("strong", {
                    children: "Name:"
                  }), " ", /* @__PURE__ */ jsx("input", {
                    name: "name",
                    value: editForm.name,
                    onChange: handleEditChange,
                    className: "border px-2 py-1 rounded"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("strong", {
                    children: "Phone:"
                  }), " ", /* @__PURE__ */ jsx("input", {
                    name: "phone",
                    value: editForm.phone,
                    onChange: handleEditChange,
                    className: "border px-2 py-1 rounded"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("strong", {
                    children: "Address:"
                  }), " ", /* @__PURE__ */ jsx("input", {
                    name: "address",
                    value: editForm.address,
                    onChange: handleEditChange,
                    className: "border px-2 py-1 rounded w-80"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex gap-2 mt-4",
                  children: [/* @__PURE__ */ jsx("button", {
                    className: "bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600",
                    onClick: handleSave,
                    children: "Save"
                  }), /* @__PURE__ */ jsx("button", {
                    className: "bg-gray-200 px-4 py-2 rounded hover:bg-gray-300",
                    onClick: () => {
                      setEditForm(employer);
                      setEditing(false);
                    },
                    children: "Cancel"
                  })]
                })]
              }) : /* @__PURE__ */ jsxs(Fragment, {
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("strong", {
                    children: "Name:"
                  }), " ", employer.name]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("strong", {
                    children: "Phone:"
                  }), " ", employer.phone]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("strong", {
                    children: "Address:"
                  }), " ", employer.address]
                }), /* @__PURE__ */ jsx("button", {
                  className: "mt-4 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600",
                  onClick: () => setEditing(true),
                  children: "Edit"
                })]
              })
            })
          }), helpers.map((helper) => /* @__PURE__ */ jsx(TabsContent, {
            value: helper.id,
            children: /* @__PURE__ */ jsxs("div", {
              className: "space-y-2 py-4",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("strong", {
                  children: "Name:"
                }), " ", helper.name]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("strong", {
                  children: "Code:"
                }), " ", helper.code]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("strong", {
                  children: "Status:"
                }), " ", helper.status]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("strong", {
                  children: "Period:"
                }), " ", helper.period]
              })]
            })
          }, helper.id)), /* @__PURE__ */ jsx(TabsContent, {
            value: "add-helper",
            children: /* @__PURE__ */ jsxs("div", {
              className: "py-8 flex flex-col items-center justify-center",
              children: [/* @__PURE__ */ jsx(Plus, {
                className: "w-8 h-8 mb-2 text-gray-400"
              }), /* @__PURE__ */ jsx("div", {
                className: "text-gray-500 mb-4",
                children: "Add a new helper to this employer."
              }), /* @__PURE__ */ jsx("button", {
                className: "bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600",
                onClick: () => {
                  const newHelper = {
                    id: `h${helpers.length + 1}`,
                    name: `New Helper ${helpers.length + 1}`,
                    code: `C${100 + helpers.length + 1}`,
                    status: "Active",
                    period: "2025-01-01 to 2027-01-01"
                  };
                  setHelpers([...helpers, newHelper]);
                  setTab(newHelper.id);
                },
                children: "Add Helper"
              })]
            })
          })]
        })
      })]
    }), /* @__PURE__ */ jsx(Card, {
      className: "w-96"
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-B5TQacZu.js", "imports": ["/assets/chunk-D4RADZKF-D-3Hgezh.js", "/assets/index-CiNbgz3y.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-D3tHoVp1.js", "imports": ["/assets/chunk-D4RADZKF-D-3Hgezh.js", "/assets/index-CiNbgz3y.js", "/assets/with-props-TYKsK61h.js"], "css": ["/assets/root-4R5eWdfE.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin/admin-layout": { "id": "routes/admin/admin-layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/admin-layout-DnA4IJ9z.js", "imports": ["/assets/with-props-TYKsK61h.js", "/assets/chunk-D4RADZKF-D-3Hgezh.js", "/assets/dialog-Dyl0I-v0.js", "/assets/index-BrLztXSm.js", "/assets/index-CiNbgz3y.js", "/assets/utils-Vb_tXTqw.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/dashboard/index": { "id": "pages/dashboard/index", "parentId": "routes/admin/admin-layout", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-hYOiskJe.js", "imports": ["/assets/with-props-TYKsK61h.js", "/assets/chunk-D4RADZKF-D-3Hgezh.js", "/assets/card-BSVjXz_l.js", "/assets/tabs-VDvNWq2k.js", "/assets/index-CiNbgz3y.js", "/assets/index-BrLztXSm.js", "/assets/utils-Vb_tXTqw.js", "/assets/dialog-Dyl0I-v0.js", "/assets/dataTable-BXWYPeXm.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/employerList/index": { "id": "pages/employerList/index", "parentId": "routes/admin/admin-layout", "path": "employerList", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-CMPraMiU.js", "imports": ["/assets/with-props-TYKsK61h.js", "/assets/chunk-D4RADZKF-D-3Hgezh.js", "/assets/card-BSVjXz_l.js", "/assets/dataTable-BXWYPeXm.js", "/assets/utils-Vb_tXTqw.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/employerProfile/index": { "id": "pages/employerProfile/index", "parentId": "routes/admin/admin-layout", "path": "employer", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-CRrps2FX.js", "imports": ["/assets/with-props-TYKsK61h.js", "/assets/chunk-D4RADZKF-D-3Hgezh.js", "/assets/tabs-VDvNWq2k.js", "/assets/card-BSVjXz_l.js", "/assets/utils-Vb_tXTqw.js", "/assets/index-BrLztXSm.js", "/assets/index-CiNbgz3y.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-a5e90e57.js", "version": "a5e90e57", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/admin/admin-layout": {
    id: "routes/admin/admin-layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "pages/dashboard/index": {
    id: "pages/dashboard/index",
    parentId: "routes/admin/admin-layout",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "pages/employerList/index": {
    id: "pages/employerList/index",
    parentId: "routes/admin/admin-layout",
    path: "employerList",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "pages/employerProfile/index": {
    id: "pages/employerProfile/index",
    parentId: "routes/admin/admin-layout",
    path: "employer",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
