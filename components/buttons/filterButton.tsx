"use client";

import { useState } from "react";
import {
    CheckIcon,
    Combobox,
    Group,
    Input,
    Pill,
    PillsInput,
    useCombobox,
} from "@mantine/core";

export default function FilterButton({ handleFilter, currentFilter, dataTitles, which }: { handleFilter: (filters: string, which: string) => void; currentFilter: string; dataTitles: string[]; which: string }) {

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
    });

    const options = dataTitles.map((item) => {
        return (
            <Combobox.Option
                value={item}
                key={item}
                active={currentFilter.includes(item)}
                onClick={() => {
                    handleFilter(item, which);
                }}
                w={170}
            >
                <Group gap="sm">
                    {currentFilter.includes(item) ? <CheckIcon size={12} /> : null}
                    <Group gap={7}>
                        <span>{item}</span>
                    </Group>
                </Group>
            </Combobox.Option>
        );
    });

    return (
        <Combobox store={combobox} withinPortal={false} width={180}>
            <Combobox.DropdownTarget>
                <PillsInput
                    label={`${which === 'x' ? 'X' : 'Y'} Attribute Filter`}
                    className="w-[150px]"
                    pointer
                    onClick={() => combobox.toggleDropdown()}
                    rightSection={
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                handleFilter("clear", which);
                            }}
                        >
                            X
                        </div>
                    }
                    w={180}
                >
                    <Pill.Group>
                        {currentFilter}
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown w={180}> 
                <Combobox.Options w={180}>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
