import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useAuthStore } from "../stores/useAuthStore"
import { Link, useLocation } from "react-router-dom"

interface NavigationItem {
  name: string
  href: string
}

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const location = useLocation()

  const navigation: NavigationItem[] = [
    { name: "Dashboard", href: "/" },
    { name: "Kurslar", href: "https://gelecegiyazanlar.turkcell.com.tr/egitimler" },
    { name: "Blog", href: "https://gelecegiyazanlar.turkcell.com.tr/gelecegi-yazanlar-blog" },
    { name: "İş İlanları", href: "" },
    ...(user ? [{ name: "Favoriler", href: "/favorites" }] : []),
  ]

  return (
    <Disclosure as="nav" className="relative min-h-[100px] bg-white after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#ffc40c]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

        <div className="relative flex h-16 items-center justify-between">
          
          {/* left*/}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-[#253342] hover:bg-[#ffc40c]/50 hover:text-[#253342] focus:outline-2 focus:-outline-offset-1 focus:outline-[#034ea2]">
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=gray"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 ">
                {navigation.map((item) => {
                  const isExternal = item.href.startsWith("http")
                  const isActive = !isExternal && location.pathname === item.href
                  
                  return isExternal ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classNames(
                        isActive
                          ? "bg-[#ffc40c] text-[#253342]"
                          : "text-[#253342] hover:bg-[#ffc40c]/50 hover:text-[#253342]",
                        "rounded-md px-3 py-2 text-[16px] font-medium text-center"
                      )}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={classNames(
                        isActive
                          ? "bg-[#ffc40c] text-[#253342]"
                          : "text-[#253342] hover:bg-[#ffc40c]/50 hover:text-[#253342]",
                        "rounded-md px-3 py-2 text-[16px] font-medium text-center"
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user ? (
              <>
                {/* Profil menüsü */}
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#034ea2]">
                    <img
                      alt="Profile"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                      className="size-8 rounded-full bg-white"
                    />
                  </MenuButton>

                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 outline -outline-offset-1 outline-white/10">
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={classNames(
                            active && "bg-white/5",
                            "block px-4 py-2 text-sm text-[#253342]"
                          )}
                        >
                          Profilim
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={classNames(
                            active && "bg-white/5",
                            "block w-full text-left px-4 py-2 text-sm text-[#253342]"
                          )}
                        >
                          Çıkış Yap
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="text-[#253342] hover:bg-[#ffc40c]/50 hover:text-[#253342] rounded-md px-3 py-2 text-[16px] font-medium text-center"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                  className=" text-[#253342] rounded-md px-3 py-2 text-[16px] font-medium hover:bg-[#ffc40c]/50 text-center"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isExternal = item.href.startsWith("http")
            const isActive = !isExternal && location.pathname === item.href
            
            return isExternal ? (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-current={isActive ? "page" : undefined}
                className={classNames(
                  isActive
                    ? "bg-[#ffc40c] text-[#253342]"
                    : "text-[#253342] hover:bg-[#ffc40c]/50 hover:text-[#253342]",
                  "block rounded-md px-3 py-2 text-base font-medium text-center" // mobile
                )}
              >
                {item.name}
              </DisclosureButton>
            ) : (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                aria-current={isActive ? "page" : undefined}
                className={classNames(
                  isActive
                    ? "bg-[#ffc40c] text-[#253342]"
                    : "text-[#253342] hover:bg-[#ffc40c]/50 hover:text-[#253342]",
                  "block rounded-md px-3 py-2 text-base font-medium text-center" // mobile
                )}
              >
                {item.name}
              </DisclosureButton>
            )
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
