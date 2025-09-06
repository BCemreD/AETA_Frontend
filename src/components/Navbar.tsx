import React from "react"
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useAuthStore } from "../stores/useAuthStore"
import { useLocation } from "react-router-dom" 

interface NavigationItem {
  name: string
  href: string
  current: boolean
}


const navigation: Omit<NavigationItem, 'current'>[] = [ 
  { name: "Dashboard", href: "/" },
  { name: "Kurslar", href: "https://gelecegiyazanlar.turkcell.com.tr/egitimler" },
  { name: "Blog", href: "https://gelecegiyazanlar.turkcell.com.tr/gelecegi-yazanlar-blog" },
  { name: "İş İlanları", href: "/jobs" },
]

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const location = useLocation() 

  return (
    <Disclosure as="nav" className="relative min-h-[100px] bg-white after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#ffc40c]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          {/* left*/}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-[#253342] hover:bg-[#ffc40c] hover:text-[#253342] focus:outline-2 focus:-outline-offset-1 focus:outline-[#034ea2]">
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 ">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    // current st. dinamic
                    aria-current={location.pathname === item.href ? "page" : undefined}
                    className={classNames(
                      location.pathname === item.href // active page check
                        ? "bg-[#ffc40c] text-[#253342]"
                        : "text-[#253342] hover:bg-[#ffc40c] hover:text-[#253342]",
                      "rounded-md px-3 py-2 text-sm font-medium text-center" 
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user ? (
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  <img
                    alt="Profile"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    className="size-8 rounded-full bg-white"
                  />
                </MenuButton>

                <MenuItems className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 outline -outline-offset-1 outline-white/10">
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="/profile"
                        className={classNames(
                          active && "bg-white/5",
                          "block px-4 py-2 text-sm text-[#253342] "
                        )}
                      >
                        Profilim
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={classNames(
                          active && "bg-white/5",
                          "block w-full text-left px-4 py-2 text-sm text-[#253342] " 
                        )}
                      >
                        Çıkış Yap
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <div className="flex gap-2">
                <a
                  href="/login"
                  className="text-[#253342] hover:bg-[#ffc40c] hover:text-[#253342] rounded-md px-3 py-2 text-sm font-medium text-center" 
                >
                  Giriş Yap
                </a>
                <a
                  href="/register"
                  className="bg-[#ffc40c] text-[#253342] rounded-md px-3 py-2 text-sm font-medium hover:bg-[#ffc40c] text-center" 
                >
                  Kayıt Ol
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              // current state dinamic
              aria-current={location.pathname === item.href ? "page" : undefined}
              className={classNames(
                location.pathname === item.href
                  ? "bg-[#ffc40c] text-[#253342]"
                  : "text-[#253342] hover:bg-[#ffc40c] hover:text-[#253342]",
                "block rounded-md px-3 py-2 text-base font-medium text-center" // mobile
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}