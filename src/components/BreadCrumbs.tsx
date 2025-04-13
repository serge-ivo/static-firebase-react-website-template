import React, { useEffect, useState } from "react";
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { firestore } from "../services/firebaseConfig"; // Import standard firestore
import { doc, getDoc } from "firebase/firestore"; // Import necessary firestore functions

interface BreadcrumbItem {
  label: string;
  path: string;
  isClickable: boolean;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [orgNameCache, setOrgNameCache] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const generateBreadcrumbs = async () => {
      const pathSegments = location.pathname
        .split("/")
        .filter((segment) => segment);
      let pathAccumulator = "";

      const resolvedBreadcrumbs = await Promise.all(
        pathSegments.map(async (segment, index) => {
          pathAccumulator += `/${segment}`;

          let label =
            {
              org: "Organization",
              edit: "Edit",
              chat: "Chat",
              tasks: "Tasks",
              meetings: "Meetings",
              "schedule-meeting": "Schedule Meeting",
              "create-org": "Create Organization",
            }[segment] || segment;

          let isClickable = true;

          if (index > 0 && pathSegments[index - 1] === "org") {
            if (orgNameCache[segment]) {
              label = orgNameCache[segment];
            } else {
              try {
                const orgDocRef = doc(firestore, `orgsPub/${segment}`);
                const orgDocSnap = await getDoc(orgDocRef);
                if (orgDocSnap.exists()) {
                  const orgData = orgDocSnap.data() as { name: string };
                  label = orgData.name || "Organization";
                  setOrgNameCache((prev) => ({ ...prev, [segment]: label }));
                } else {
                  label = "Organization";
                }
              } catch (error) {
                console.error("Error fetching organization name:", error);
                label = "Organization";
              }
            }
            isClickable = true;
          }

          if (segment === "org") {
            isClickable = false;
          }

          return {
            label,
            path: pathAccumulator,
            isClickable,
          };
        })
      );

      setBreadcrumbs(resolvedBreadcrumbs);
    };

    generateBreadcrumbs();
  }, [location.pathname, orgNameCache]);

  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      <Link component={RouterLink} to="/" underline="hover" color="inherit">
        Dashboard
      </Link>
      {breadcrumbs.map((crumb, index) =>
        index === breadcrumbs.length - 1 || !crumb.isClickable ? (
          <Typography key={crumb.path} color="text.primary">
            {crumb.label}
          </Typography>
        ) : (
          <Link
            key={crumb.path}
            component={RouterLink}
            to={crumb.path}
            underline="hover"
            color="inherit"
          >
            {crumb.label}
          </Link>
        )
      )}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
