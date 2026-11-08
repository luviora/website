"use client";

import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { AutocompleteField } from "@/components/ui/autocomplete-field";
import { FloatingField, NativeSelect } from "@/components/ui/form-controls";
import {
  fetchFipeBrands,
  fetchFipeIdentity,
  fetchFipeModels,
  fetchFipeYears,
  filterFipeItems,
} from "@/lib/fipe/browser";
import type { FipeItem } from "@/lib/fipe/types";

type FormValues = Record<string, unknown>;

export function FipeVehicleFields({
  form,
  product,
}: {
  form: UseFormReturn<FormValues> | UseFormReturn;
  product: string;
}) {
  const setValue = form.setValue as UseFormReturn<FormValues>["setValue"];
  const watch = form.watch as UseFormReturn<FormValues>["watch"];
  const errors = form.formState
    .errors as UseFormReturn<FormValues>["formState"]["errors"];
  const [brands, setBrands] = useState<FipeItem[]>([]);
  const [models, setModels] = useState<FipeItem[]>([]);
  const [years, setYears] = useState<FipeItem[]>([]);
  const [brandQuery, setBrandQuery] = useState("");
  const [modelQuery, setModelQuery] = useState("");
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const brand = String(watch("brand") ?? "");
  const brandCode = String(watch("brandCode") ?? "");
  const model = String(watch("model") ?? "");
  const modelCode = String(watch("modelCode") ?? "");
  const yearCode = String(watch("yearCode") ?? "");

  const brandError = errors.brand?.message as string | undefined;
  const modelError = errors.model?.message as string | undefined;
  const yearError = errors.year?.message as string | undefined;

  useEffect(() => {
    let cancelled = false;
    setLoadingBrands(true);
    fetchFipeBrands()
      .then((items) => {
        if (!cancelled) {
          setBrands(items);
          setLoadError(null);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) setLoadError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoadingBrands(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!brandCode) {
      setModels([]);
      return;
    }
    let cancelled = false;
    setLoadingModels(true);
    fetchFipeModels(brandCode)
      .then((items) => {
        if (!cancelled) setModels(items);
      })
      .catch((err: Error) => {
        if (!cancelled) setLoadError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoadingModels(false);
      });
    return () => {
      cancelled = true;
    };
  }, [brandCode]);

  useEffect(() => {
    if (!brandCode || !modelCode) {
      setYears([]);
      return;
    }
    let cancelled = false;
    setLoadingYears(true);
    fetchFipeYears(brandCode, modelCode)
      .then((items) => {
        if (!cancelled) setYears(items);
      })
      .catch((err: Error) => {
        if (!cancelled) setLoadError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoadingYears(false);
      });
    return () => {
      cancelled = true;
    };
  }, [brandCode, modelCode]);

  const clearDownstreamFromBrand = () => {
    setValue("model", "");
    setValue("modelCode", "");
    setValue("year", "");
    setValue("yearCode", "");
    setValue("fipeCode", "");
    setModelQuery("");
  };

  const clearDownstreamFromModel = () => {
    setValue("year", "");
    setValue("yearCode", "");
    setValue("fipeCode", "");
  };

  async function onYearChange(code: string) {
    if (!code) {
      clearDownstreamFromModel();
      return;
    }
    const option = years.find((item) => item.code === code);
    if (!option) {
      clearDownstreamFromModel();
      return;
    }
    setValue("year", option.name, { shouldValidate: true });
    setValue("yearCode", option.code, { shouldValidate: true });
    try {
      const identity = await fetchFipeIdentity(
        brandCode,
        modelCode,
        option.code,
      );
      setValue("fipeCode", identity.codeFipe, { shouldValidate: true });
    } catch {
      setValue("fipeCode", "");
    }
  }

  return (
    <div className="space-y-5">
      {loadError ? (
        <p
          className="rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {loadError}
        </p>
      ) : null}
      <p className="text-center text-xs text-muted-foreground">
        Marca e modelo com busca FIPE. O ano só aparece na lista oficial, sem
        digitar número solto.
      </p>

      <AutocompleteField
        id={`${product}-brand`}
        label="Marca"
        helper="Digite para filtrar (ex.: Honda, VW)"
        error={brandError}
        value={brand}
        displayValue={brandQuery}
        options={filterFipeItems(brands, brandQuery)}
        loading={loadingBrands}
        placeholder="Selecione a marca"
        onQueryChange={(q) => {
          setBrandQuery(q);
          if (brand) {
            setValue("brand", "");
            setValue("brandCode", "");
            clearDownstreamFromBrand();
          }
        }}
        onClear={() => {
          setValue("brand", "");
          setValue("brandCode", "");
          clearDownstreamFromBrand();
        }}
        onSelect={(option) => {
          setValue("brand", option.name, { shouldValidate: true });
          setValue("brandCode", option.code, { shouldValidate: true });
          setBrandQuery("");
          clearDownstreamFromBrand();
        }}
      />

      <AutocompleteField
        id={`${product}-model`}
        label="Modelo"
        helper={
          brandCode
            ? "Digite para filtrar o modelo FIPE"
            : "Selecione a marca primeiro"
        }
        error={modelError}
        value={model}
        displayValue={modelQuery}
        options={filterFipeItems(models, modelQuery)}
        loading={loadingModels}
        disabled={!brandCode}
        placeholder="Selecione o modelo"
        onQueryChange={(q) => {
          setModelQuery(q);
          if (model) {
            setValue("model", "");
            setValue("modelCode", "");
            clearDownstreamFromModel();
          }
        }}
        onClear={() => {
          setValue("model", "");
          setValue("modelCode", "");
          clearDownstreamFromModel();
        }}
        onSelect={(option) => {
          setValue("model", option.name, { shouldValidate: true });
          setValue("modelCode", option.code, { shouldValidate: true });
          setModelQuery("");
          clearDownstreamFromModel();
        }}
      />

      <FloatingField
        id={`${product}-year`}
        label="Ano e combustível"
        helper={
          !modelCode
            ? "Selecione o modelo primeiro"
            : loadingYears
              ? "Carregando anos FIPE…"
              : "Escolha apenas uma opção da lista"
        }
        error={yearError}
      >
        <NativeSelect
          id={`${product}-year`}
          error={!!yearError}
          disabled={!modelCode || loadingYears || years.length === 0}
          value={yearCode}
          aria-invalid={!!yearError}
          onChange={(e) => {
            void onYearChange(e.target.value);
          }}
        >
          <option value="">
            {loadingYears ? "Carregando…" : "Selecione o ano"}
          </option>
          {years.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </NativeSelect>
      </FloatingField>
    </div>
  );
}
