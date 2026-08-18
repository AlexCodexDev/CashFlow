"use client";

import { InputGroupInput } from "@/components/ui/input-group";
import * as React from "react";

interface NumberInputProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "value" | "onChange"
    > {
    value?: number | null;
    onChange?: (value: number | null) => void;
}

export function NumberInput({
    value,
    onChange,
    ...props
}: NumberInputProps) {
    const formattedValue =
        value !== null && value !== undefined
            ? new Intl.NumberFormat("id-ID").format(value)
            : 0;

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const rawValue = event.target.value.replace(/\D/g, "");

        onChange?.(
            rawValue === "" ? null : Number(rawValue)
        );
    };

    return (
        <InputGroupInput
            {...props}
            type="text"
            inputMode="numeric"
            value={formattedValue}
            onChange={handleChange}
        />
    );
}