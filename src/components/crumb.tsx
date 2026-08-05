import { CustomBreadCrumbTypes } from "@/types/crumb";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";


export function CustomBreadCrumb({ list }: CustomBreadCrumbTypes) {
    return(
        <Breadcrumb className="pl-3 pt-3">
            <BreadcrumbList>
                {list.map((item, index) => (
                    <>
                        {index < list.length - 1 ? (
                            <BreadcrumbItem>
                                <BreadcrumbLink render={<a href={item.url} />}>{item.label}</BreadcrumbLink>
                            </BreadcrumbItem>
                        ) : (
                            <BreadcrumbItem>
                                <BreadcrumbPage>{item.label}</BreadcrumbPage>
                            </BreadcrumbItem>
                        )}
                        {index < list.length - 1 && <BreadcrumbSeparator />}
                    </>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}