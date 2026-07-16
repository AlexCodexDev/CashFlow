export function isActiveRoute(pathName: string, href: string) {
    if(href === "/dashboard") {
        return pathName === href;
    }

    return pathName.startsWith(href);
}