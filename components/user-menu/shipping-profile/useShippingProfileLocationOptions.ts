"use client";

import { useCallback, useEffect, useState } from "react";

import type { FilterOption } from "@/types/filter";
import { shippingProfilesApi } from "@/services/shipping-profiles.api";

type OptionsArgs = {
  provinceId: number | null;
  districtId: number | null;
};

type OptionsResult = {
  districtOptions: FilterOption[];
  wardOptions: FilterOption[];
  loadProvinceOptions: (inputValue: string) => Promise<FilterOption[]>;
  loadDistrictOptions: (inputValue: string) => Promise<FilterOption[]>;
  loadWardOptions: (inputValue: string) => Promise<FilterOption[]>;
};

const filterOptions = (inputValue: string, options: FilterOption[]) => {
  const keyword = inputValue.trim().toLowerCase();
  if (!keyword) return options;
  return options.filter((option) =>
    option.label.toLowerCase().includes(keyword),
  );
};

export function useShippingProfileLocationOptions({
  provinceId,
  districtId,
}: OptionsArgs): OptionsResult {
  const [districtOptions, setDistrictOptions] = useState<FilterOption[]>([]);
  const [wardOptions, setWardOptions] = useState<FilterOption[]>([]);

  const loadProvinceOptions = useCallback(async (inputValue: string) => {
    const provinces = await shippingProfilesApi.getProvinces();
    const options = provinces.map((province) => ({
      value: province.id,
      label: province.name,
    }));
    return filterOptions(inputValue, options);
  }, []);

  const loadDistrictOptions = useCallback(
    async (inputValue: string) => filterOptions(inputValue, districtOptions),
    [districtOptions],
  );

  const loadWardOptions = useCallback(
    async (inputValue: string) => filterOptions(inputValue, wardOptions),
    [wardOptions],
  );

  useEffect(() => {
    let isActive = true;
    if (!provinceId) {
      setDistrictOptions([]);
      setWardOptions([]);
      return;
    }

    shippingProfilesApi.getDistricts(provinceId).then((districts) => {
      if (!isActive) return;
      const options = districts.map((district) => ({
        value: district.id,
        label: district.name,
      }));
      setDistrictOptions(options);
    });

    return () => {
      isActive = false;
    };
  }, [provinceId]);

  useEffect(() => {
    let isActive = true;
    if (!districtId) {
      setWardOptions([]);
      return;
    }

    shippingProfilesApi.getWards(districtId).then((wards) => {
      if (!isActive) return;
      const options = wards.map((ward) => ({
        value: ward.code,
        label: ward.name,
      }));
      setWardOptions(options);
    });

    return () => {
      isActive = false;
    };
  }, [districtId]);

  return {
    districtOptions,
    wardOptions,
    loadProvinceOptions,
    loadDistrictOptions,
    loadWardOptions,
  };
}
