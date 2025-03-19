import React, { Fragment } from "react";
import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import IBreadcrumb from "@/types/Breadcrumb";
import Link from "next/link";

const AppBreadcrumbs = ({
  breadcrumbs,
}: Readonly<{ breadcrumbs: IBreadcrumb[] }>) => {
  return (
    <>
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => {
            if (index + 1 !== breadcrumbs.length) {
              return (
                <Fragment key={`${breadcrumb.title}_${index}`}>
                  <BreadcrumbItem className="hidden md:block">
                    {breadcrumb.link ? (
                      <Link href={breadcrumb.link}>
                        <BreadcrumbPage className="underline underline-offset-3">
                          {breadcrumb.title}
                        </BreadcrumbPage>
                      </Link>
                    ) : (
                      breadcrumb.title
                    )}
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </Fragment>
              );
            } else {
              return (
                <BreadcrumbItem key={breadcrumb.title}>
                  <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            }
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default AppBreadcrumbs;
