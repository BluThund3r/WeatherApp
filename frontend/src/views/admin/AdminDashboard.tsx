import React, { useEffect, useState } from "react";
import { fetchWithToken } from "../../utils/jwtUtils";
import { apiDomainName } from "../../configConsts";
import { toast } from "sonner";
import CustomTable from "../../components/customTable/CustomTable";
import { Button } from "@mui/material";
import { UilTrashAlt as TrashIcon } from "@iconscout/react-unicons";

interface AdminUserInfo {
  id: number;
  username: string;
  admin: boolean;
}

export function AdminDashboard() {
  const [users, setUsers] = useState<AdminUserInfo[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetchWithToken(
        `${apiDomainName}/admin/getAllUsers`
      );
      if (!response.ok) {
        const responseText = await response.text();
        toast.error(responseText);
        console.error("Error fetching users", responseText);
      }

      const data = await response.json();
      setUsers(data);
      toast.success("Users loaded successfully");
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (user: AdminUserInfo) => {
    if (user.admin) {
      toast.error("Cannot delete admin");
      return;
    }

    const response = await fetchWithToken(
      `${apiDomainName}/admin/deleteUserById/${user.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const responseText = await response.text();
      toast.error(responseText);
      console.error("Error deleting user", responseText);
    }

    setUsers((users) => {
      return users.filter((u) => u.id !== user.id);
    });
    toast.success(`User ${user.username} deleted`);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center gap-6">
      <h1 className="w-full text-5xl font-extrabold text-center block mt-4">
        Admin Dashboard
      </h1>
      <div
        style={{
          width: "80%",
          backgroundColor: "rgba(128, 128, 128, 0.4)",
          height: "80vh",
        }}
        className="p-5 rounded-lg overflow-y-scroll mt-4"
      >
        <CustomTable
          tableHeaders={["Id", "Username", "Is Admin", "Delete"]}
          tableStyle={{ width: "100%" }}
          tableHeaderStyle={{
            color: "white",
            fontSize: "1.2rem",
            fontWeight: 800,
          }}
          tableData={users.map((user) => {
            return {
              ...user,
              isAdmin: user.admin ? "Yes" : "No",
              delete: (
                <Button
                  style={{
                    backgroundColor: "#f0473a",
                    color: "white",
                    width: "fit-content",
                  }}
                  onClick={() => handleDeleteUser(user)}
                >
                  <TrashIcon />
                </Button>
              ),
            };
          })}
          tableDataOrder={["id", "username", "isAdmin", "delete"]}
        />
      </div>
    </div>
  );
}
