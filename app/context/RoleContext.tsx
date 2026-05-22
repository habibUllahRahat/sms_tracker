"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Role = "STAFF" | "STUDENT";

interface RoleSetter {
	(role: Role | ((prevRole: Role) => Role)): void;
}

interface RoleContextType {
	role: Role;
	toggleRole: () => void;
	setRole: RoleSetter;
}

interface RoleProviderProps {
	children: React.ReactNode;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: RoleProviderProps) {
	const [role, setRoleState] = useState<Role>("STAFF");

	useEffect(() => {
		const savedRole = localStorage.getItem("user-role") as Role;
		if (savedRole === "STAFF" || savedRole === "STUDENT") {
			setRoleState(savedRole);
		}
	}, []);

	const setRole: RoleSetter = (newRole) => {
		if (typeof newRole === "function") {
			setRoleState((prev) => {
				const next = (newRole as (prevRole: Role) => Role)(prev);
				localStorage.setItem("user-role", next);
				return next;
			});
		} else {
			setRoleState(newRole);
			localStorage.setItem("user-role", newRole);
		}
	};

	const toggleRole = () => {
		setRole((prev) => (prev === "STAFF" ? "STUDENT" : "STAFF"));
	};

	return (
		<RoleContext.Provider value={{ role, toggleRole, setRole }}>
			{children}
		</RoleContext.Provider>
	);
}

export function useRole() {
	const context = useContext(RoleContext);
	if (context === undefined) {
		throw new Error("useRole must be used within a RoleProvider");
	}
	return context;
}
