import { useState } from "react";

import {
  Button,
  Card,
  Input,
  Select,
} from "@/components/ui";

import {
  defaultThemeValues,
} from "../utils/themeDefaults";

import { themePresets } from "../utils/themePresets";

import {
  getSectionOrder,
  getSectionVisibility,
  normalizeTheme,
} from "../utils/themeHelpers";

import ColorField from "./ColorField";
import ThemePreview from "./ThemePreview";
import ThemeSectionDesigner from "./ThemeSectionDesigner";

const fonts = [
  "Inter",
  "Arial",
  "Helvetica",
  "Verdana",
  "Tahoma",
  "Georgia",
  "Times New Roman",
];



const colorGroups = [
  [
    "Brand Colours",
    ["primary", "secondary", "accent"],
  ],
  [
    "Document Colours",
    [
      "background",
      "surface",
      "text",
      "mutedText",
      "border",
    ],
  ],
  [
    "Table Colours",
    [
      "tableHeaderBackground",
      "tableHeaderText",
    ],
  ],
  [
    "Totals",
    ["totalBackground", "totalText"],
  ],
];

const label = (value) =>
  value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) =>
      letter.toUpperCase()
    );

const HEX = /^#[0-9a-fA-F]{6}$/;

/*
|--------------------------------------------------------------------------
| Build Form State
|--------------------------------------------------------------------------
*/

const buildFormState = (theme = {}) => {
  const base = normalizeTheme({
    ...defaultThemeValues,
    ...theme,
  });

  return {
    ...base,

    colors: {
      ...defaultThemeValues.colors,
      ...base.colors,
    },

    typography: {
      ...defaultThemeValues.typography,
      ...base.typography,
    },

  branding: {
  ...defaultThemeValues.branding,
  ...(base.branding || {}),

  logo: {
    ...defaultThemeValues.branding?.logo,
    ...(base.branding?.logo || {}),

    container: {
      ...defaultThemeValues.branding?.logo?.container,
      ...(base.branding?.logo?.container || {}),
    },
  },
},

    header: {
      ...defaultThemeValues.header,
      ...(base.header || {}),
    },

    watermark: {
      ...defaultThemeValues.watermark,
      ...(base.watermark || {}),
    },

    layout: {
      ...defaultThemeValues.layout,
      ...(base.layout || {}),

      print: {
        ...(defaultThemeValues.layout?.print || {}),
        ...(base.layout?.print || {}),
      },

      sectionOrder:
        getSectionOrder(base),

      sections:
        getSectionVisibility(base),
    },

    session: {
      ...defaultThemeValues.session,
      ...(base.session || {}),
    },

    table: {
      ...defaultThemeValues.table,
      ...(base.table || {}),

      columnVisibility: {
        ...defaultThemeValues.table.columnVisibility,
        ...(base.table?.columnVisibility || {}),
      },

      columnLabels: {
        ...defaultThemeValues.table.columnLabels,
        ...(base.table?.columnLabels || {}),
      },

      alignment: {
        ...defaultThemeValues.table.alignment,
        ...(base.table?.alignment || {}),
      },
    },

    totals: {
      ...defaultThemeValues.totals,
      ...(base.totals || {}),
    },

    payment: {
      ...defaultThemeValues.payment,
      ...(base.payment || {}),
    },

    footer: {
      ...defaultThemeValues.footer,
      ...(base.footer || {}),
    },
  };
};

export default function ThemeForm({
  theme,
  business,
  onSubmit,
  onCancel,
  saving = false,
}) {
  const [values, setValues] = useState(() =>
    buildFormState(theme)
  );

  const [selectedSection, setSelectedSection] =
    useState(
      () =>
        getSectionOrder(
          theme || defaultThemeValues
        )[0]
    );

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Basic Changes
  |--------------------------------------------------------------------------
  */

  const change = (field, value) => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Nested Changes
  |--------------------------------------------------------------------------
  */

  const nested = (
    group,
    field,
    value
  ) => {
    setValues((current) => ({
      ...current,

      [group]: {
        ...current[group],
        [field]: value,
      },
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Deep Nested Changes
  |--------------------------------------------------------------------------
  */

  const deepNested = (
    group,
    subgroup,
    field,
    value
  ) => {
    setValues((current) => ({
      ...current,

      [group]: {
        ...current[group],

        [subgroup]: {
          ...current[group]?.[subgroup],
          [field]: value,
        },
      },
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | updatelogocontainer
  |--------------------------------------------------------------------------
  */

  const updateLogoContainer = (field, value) => {
  setValues((current) => ({
    ...current,
    branding: {
      ...current.branding,
      logo: {
        ...current.branding?.logo,
        container: {
          ...current.branding?.logo?.container,
          [field]: value,
        },
      },
    },
  }));
};

  /*
  |--------------------------------------------------------------------------
  | Presets
  |--------------------------------------------------------------------------
  */

  const applyPreset = (name) => {
    const preset =
      themePresets.find(
        (item) => item.name === name
      );

    if (!preset) return;

    setValues((current) => ({
      ...current,

      ...preset,

      id: current.id,

      businessId:
        current.businessId,

      colors: {
        ...preset.colors,
      },

      typography: {
        ...preset.typography,
      },

      branding:
        current.branding,

      header: {
        ...defaultThemeValues.header,
        ...(preset.header || {}), 
      },

      watermark: {
        ...defaultThemeValues.watermark,
        ...(preset.watermark || {}),
      },

      layout: {
        ...defaultThemeValues.layout,

        ...(preset.layout || {}),

        print: {
          ...defaultThemeValues.layout?.print,
          ...(preset.layout?.print || {}),
        },

        sectionOrder:
          getSectionOrder({
            layout:
              preset.layout ||
              defaultThemeValues.layout,
          }),

        sections:
          getSectionVisibility({
            layout:
              preset.layout ||
              defaultThemeValues.layout,
          }),
      },
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Section Visibility
  |--------------------------------------------------------------------------
  */

  const handleToggleVisibility = (
    sectionId,
    visible
  ) => {
    setValues((current) => {
      const nextSections = {
        ...getSectionVisibility(current),

        ...(current.layout?.sections || {}),
      };

      nextSections[sectionId] = {
        ...(nextSections[sectionId] || {}),
        visible: Boolean(visible),
      };

      return {
        ...current,

        layout: {
          ...current.layout,
          sections: nextSections,
        },
      };
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Section Reordering
  |--------------------------------------------------------------------------
  */

  const handleReorder = (
    sourceId,
    targetId
  ) => {
    setValues((current) => {
      const order = [
        ...(current.layout?.sectionOrder ||
          defaultThemeValues.layout.sectionOrder),
      ];

      const from =
        order.indexOf(sourceId);

      const to =
        order.indexOf(targetId);

      if (
        from === -1 ||
        to === -1 ||
        from === to
      ) {
        return current;
      }

      order.splice(from, 1);

      order.splice(
        to,
        0,
        sourceId
      );

      return {
        ...current,

        layout: {
          ...current.layout,
          sectionOrder: order,
        },
      };
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Print Setting Helpers
  |--------------------------------------------------------------------------
  */

  const updatePrintSetting = (
    field,
    value
  ) => {
    setValues((current) => ({
      ...current,

      layout: {
        ...current.layout,

        print: {
          ...(current.layout?.print || {}),
          [field]: value,
        },
      },
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Reset Print Settings
  |--------------------------------------------------------------------------
  */

  const resetPrintSettings = () => {
    setValues((current) => ({
      ...current,

      layout: {
        ...current.layout,

        print: {
          ...(defaultThemeValues.layout?.print ||
            {}),
        },
      },
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const submit = (event) => {
    event.preventDefault();

    setError("");

    if (!values.name.trim()) {
      setError(
        "Theme name is required."
      );

      return;
    }

    if (
      Object.values(values.colors).some(
        (value) =>
          !HEX.test(value || "")
      )
    ) {
      setError(
        "Colours must use six-digit HEX values."
      );

      return;
    }

    onSubmit({
      ...normalizeTheme(values),

      primaryColor:
        values.colors.primary,

      secondaryColor:
        values.colors.secondary,

      accentColor:
        values.colors.accent,

      fontFamily:
        values.typography.bodyFont,

      headingFont:
        values.typography.headingFont,

      bodyFont:
        values.typography.bodyFont,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <form
      onSubmit={submit}
      className="space-y-5"
    >
      {/* ==========================================================
          THEME
          ========================================================== */}

      <Card>
        <h3 className="mb-4 font-semibold">
          Theme
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Theme Name">
            <Input
              value={values.name}
              onChange={(event) =>
                change(
                  "name",
                  event.target.value
                )
              }
              autoFocus
            />
          </Field>

          <Select
            label="Preset Themes"
            value=""
            onChange={applyPreset}
            placeholder="Load a preset"
            options={themePresets.map(
              (item) => ({
                value: item.name,
                label: item.name,
              })
            )}
          />
        </div>
      </Card>

      {/* ==========================================================
          COLOURS
          ========================================================== */}

      <Card>
        <h3 className="mb-4 font-semibold">
          Colours
        </h3>

        <div className="space-y-5">
          {colorGroups.map(
            ([title, fields]) => (
              <section key={title}>
                <h4 className="mb-3 text-sm font-semibold text-slate-700">
                  {title}
                </h4>

                <div className="grid gap-3 sm:grid-cols-2">
                  {fields.map(
                    (field) => (
                      <ColorField
                        key={field}
                        label={label(
                          field
                        )}
                        value={
                          values.colors[
                            field
                          ]
                        }
                        onChange={(
                          value
                        ) =>
                          nested(
                            "colors",
                            field,
                            value
                          )
                        }
                      />
                    )
                  )}
                </div>
              </section>
            )
          )}
        </div>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-slate-700">
            Session Title Colour
          </h4>

          <p className="mb-4 text-xs text-slate-500">
            Set the colour of session titles independently from the brand colour.
          </p>

          <ColorField
            label="Session Title Colour"
            value={
              values.session?.titleColor ||
              defaultThemeValues.session?.titleColor ||
              values.colors.accent
            }
            onChange={(value) =>
              nested("session", "titleColor", value)
            }
          />
        </div>

        <div className="mt-5">
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              setValues(
                (current) => ({
                  ...current,

                  colors: {
                    ...defaultThemeValues.colors,
                  },
                })
              )
            }
          >
            Reset Colours
          </Button>
        </div>
      </Card>

 {/* ==========================================================
         LOGO SETTING
          ========================================================== */}

      <Card>
  <h3 className="mb-1 font-semibold">
    Logo Container
  </h3>

  <p className="mb-5 text-sm text-slate-500">
    Control the container surrounding the business logo.
    Turn it off to display the logo directly without a
    background, border, padding or shadow.
  </p>

  <div className="space-y-6">
    {/* CONTAINER ON / OFF */}
    <Toggle
      label="Show Logo Container"
      checked={Boolean(
        values.branding?.logo?.container?.enabled
      )}
      onChange={(checked) =>
        updateLogoContainer("enabled", checked)
      }
    />

    {values.branding?.logo?.container?.enabled && (
      <>
        {/* BACKGROUND */}
        <section>
          <h4 className="mb-3 text-sm font-semibold text-slate-700">
            Container Appearance
          </h4>

          <ColorField
            label="Container Background"
            value={
              values.branding?.logo?.container?.background ||
              "#FFFFFF"
            }
            onChange={(value) =>
              updateLogoContainer("background", value)
            }
          />
        </section>

        {/* SIZE */}
        <section>
          <h4 className="mb-3 text-sm font-semibold text-slate-700">
            Container Size
          </h4>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Width">
              <Input
                value={
                  values.branding?.logo?.container?.width ||
                  "auto"
                }
                onChange={(event) =>
                  updateLogoContainer(
                    "width",
                    event.target.value
                  )
                }
                placeholder="auto, 150px, 40mm..."
              />
            </Field>

            <Field label="Height">
              <Input
                value={
                  values.branding?.logo?.container?.height ||
                  "auto"
                }
                onChange={(event) =>
                  updateLogoContainer(
                    "height",
                    event.target.value
                  )
                }
                placeholder="auto, 80px, 25mm..."
              />
            </Field>
          </div>
        </section>

        {/* PADDING */}
        <section>
          <h4 className="mb-3 text-sm font-semibold text-slate-700">
            Container Padding
          </h4>

          <p className="mb-4 text-xs text-slate-500">
            Space between the logo and the container edge.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <NumberField
              label="Top"
              value={
                values.branding?.logo?.container
                  ?.paddingTop ?? 8
              }
              onChange={(value) =>
                updateLogoContainer(
                  "paddingTop",
                  value
                )
              }
            />

            <NumberField
              label="Right"
              value={
                values.branding?.logo?.container
                  ?.paddingRight ?? 12
              }
              onChange={(value) =>
                updateLogoContainer(
                  "paddingRight",
                  value
                )
              }
            />

            <NumberField
              label="Bottom"
              value={
                values.branding?.logo?.container
                  ?.paddingBottom ?? 8
              }
              onChange={(value) =>
                updateLogoContainer(
                  "paddingBottom",
                  value
                )
              }
            />

            <NumberField
              label="Left"
              value={
                values.branding?.logo?.container
                  ?.paddingLeft ?? 12
              }
              onChange={(value) =>
                updateLogoContainer(
                  "paddingLeft",
                  value
                )
              }
            />
          </div>
        </section>

        {/* MARGIN */}
        <section>
          <h4 className="mb-3 text-sm font-semibold text-slate-700">
            Container Margins
          </h4>

          <p className="mb-4 text-xs text-slate-500">
            Space outside the logo container.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <NumberField
              label="Top"
              value={
                values.branding?.logo?.container
                  ?.marginTop ?? 0
              }
              onChange={(value) =>
                updateLogoContainer(
                  "marginTop",
                  value
                )
              }
            />

            <NumberField
              label="Right"
              value={
                values.branding?.logo?.container
                  ?.marginRight ?? 0
              }
              onChange={(value) =>
                updateLogoContainer(
                  "marginRight",
                  value
                )
              }
            />

            <NumberField
              label="Bottom"
              value={
                values.branding?.logo?.container
                  ?.marginBottom ?? 0
              }
              onChange={(value) =>
                updateLogoContainer(
                  "marginBottom",
                  value
                )
              }
            />

            <NumberField
              label="Left"
              value={
                values.branding?.logo?.container
                  ?.marginLeft ?? 0
              }
              onChange={(value) =>
                updateLogoContainer(
                  "marginLeft",
                  value
                )
              }
            />
          </div>
        </section>

        {/* BORDER */}
        <section>
          <h4 className="mb-3 text-sm font-semibold text-slate-700">
            Container Border
          </h4>

          <div className="space-y-4">
            <Toggle
              label="Show Border"
              checked={Boolean(
                values.branding?.logo?.container
                  ?.borderEnabled
              )}
              onChange={(checked) =>
                updateLogoContainer(
                  "borderEnabled",
                  checked
                )
              }
            />

            {values.branding?.logo?.container
              ?.borderEnabled && (
              <div className="grid gap-4 sm:grid-cols-3">
                <ColorField
                  label="Border Colour"
                  value={
                    values.branding?.logo?.container
                      ?.borderColor || "#D1D5DB"
                  }
                  onChange={(value) =>
                    updateLogoContainer(
                      "borderColor",
                      value
                    )
                  }
                />

                <NumberField
                  label="Border Width"
                  value={
                    values.branding?.logo?.container
                      ?.borderWidth ?? 1
                  }
                  onChange={(value) =>
                    updateLogoContainer(
                      "borderWidth",
                      value
                    )
                  }
                />

                <NumberField
                  label="Border Radius"
                  value={
                    values.branding?.logo?.container
                      ?.borderRadius ?? 0
                  }
                  onChange={(value) =>
                    updateLogoContainer(
                      "borderRadius",
                      value
                    )
                  }
                />
              </div>
            )}
          </div>
        </section>

        {/* SHADOW */}
        <section>
          <h4 className="mb-3 text-sm font-semibold text-slate-700">
            Container Shadow
          </h4>

          <Toggle
            label="Show Shadow"
            checked={Boolean(
              values.branding?.logo?.container
                ?.shadowEnabled
            )}
            onChange={(checked) =>
              updateLogoContainer(
                "shadowEnabled",
                checked
              )
            }
          />
        </section>
      </>
    )}
  </div>
</Card>

      {/* ==========================================================
          HEADER APPEARANCE
          ========================================================== */}

      <Card>
        <h3 className="mb-1 font-semibold">
          Invoice Header
        </h3>

        <p className="mb-5 text-sm text-slate-500">
          Control the background and text
          colour of the invoice header.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Header Background"
            value={
              values.header?.background ||
              "primary"
            }
            onChange={(value) =>
              nested(
                "header",
                "background",
                value
              )
            }
            options={[
              {
                value: "primary",
                label:
                  "Primary Colour",
              },
              {
                value: "secondary",
                label:
                  "Secondary Colour",
              },
              {
                value: "accent",
                label:
                  "Accent Colour",
              },
              {
                value: "surface",
                label: "Surface",
              },
              {
                value: "background",
                label:
                  "Document Background",
              },
              {
                value: "transparent",
                label:
                  "Transparent",
              },
            ]}
          />

          <Select
            label="Header Text Colour"
            value={
              values.header?.textColor ||
              "#FFFFFF"
            }
            onChange={(value) =>
              nested(
                "header",
                "textColor",
                value
              )
            }
            options={[
              {
                value: "#FFFFFF",
                label: "White",
              },
              {
                value: "#000000",
                label: "Black",
              },
              {
                value: "primary",
                label:
                  "Primary Colour",
              },
              {
                value: "secondary",
                label:
                  "Secondary Colour",
              },
              {
                value: "accent",
                label:
                  "Accent Colour",
              },
            ]}
          />
        </div>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-lg border border-slate-200"
              style={{
                backgroundColor:
                  values.header?.background ===
                  "primary"
                    ? values.colors.primary
                    : values.header?.background ===
                      "secondary"
                    ? values.colors.secondary
                    : values.header?.background ===
                      "accent"
                    ? values.colors.accent
                    : values.header?.background ===
                      "surface"
                    ? values.colors.surface
                    : values.colors.background,
              }}
            />

            <div>
              <p className="text-sm font-medium text-slate-800">
                Header Preview
              </p>

              <p className="text-xs text-slate-500">
                This colour will be used
                behind the business identity
                and invoice title.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* ==========================================================
          WATERMARK
          ========================================================== */}

      <Card>
        <h3 className="mb-1 font-semibold">
          Invoice Watermark
        </h3>

        <p className="mb-5 text-sm text-slate-500">
          Use the selected business logo as
          a large background watermark on
          the invoice.
        </p>

        <div className="space-y-5">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Toggle
              label="Show Business Logo Watermark"
              checked={
                values.watermark?.enabled
              }
              onChange={(checked) =>
                nested(
                  "watermark",
                  "enabled",
                  checked
                )
              }
            />

            <p className="mt-2 text-xs text-slate-500">
              The watermark automatically
              uses the logo stored on the
              selected Business.
            </p>

            {business?.logo && (
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={business.logo}
                  alt="Business logo"
                  className="h-12 w-12 rounded-lg border border-slate-200 bg-white object-contain p-1"
                />

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Current Business Logo
                  </p>

                  <p className="text-xs text-slate-500">
                    This logo will be used
                    automatically.
                  </p>
                </div>
              </div>
            )}

            {!business?.logo && (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                This business does not
                currently have a logo.
                Add a logo on the Business
                page to use the watermark.
              </div>
            )}
          </div>

          {values.watermark?.enabled && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Watermark Size"
                value={
                  values.watermark?.size ||
                  "extraLarge"
                }
                onChange={(value) =>
                  nested(
                    "watermark",
                    "size",
                    value
                  )
                }
                options={[
                  {
                    value: "small",
                    label: "Small",
                  },
                  {
                    value: "medium",
                    label: "Medium",
                  },
                  {
                    value: "large",
                    label: "Large",
                  },
                  {
                    value: "extraLarge",
                    label:
                      "Extra Large",
                  },
                ]}
              />

              <Select
                label="Watermark Position"
                value={
                  values.watermark?.position ||
                  "center"
                }
                onChange={(value) =>
                  nested(
                    "watermark",
                    "position",
                    value
                  )
                }
                options={[
                  {
                    value: "center",
                    label: "Center",
                  },
                  {
                    value: "topCenter",
                    label:
                      "Top Center",
                  },
                  {
                    value: "bottomCenter",
                    label:
                      "Bottom Center",
                  },
                ]}
              />

              <Select
                label="Watermark Opacity"
                value={String(
                  values.watermark?.opacity ??
                    0.1
                )}
                onChange={(value) =>
                  nested(
                    "watermark",
                    "opacity",
                    Number(value)
                  )
                }
                options={[
                  {
                    value: "0.05",
                    label: "5%",
                  },
                  {
                    value: "0.08",
                    label: "8%",
                  },
                  {
                    value: "0.1",
                    label: "10%",
                  },
                  {
                    value: "0.12",
                    label: "12%",
                  },
                  {
                    value: "0.15",
                    label: "15%",
                  },
                  {
                    value: "0.2",
                    label: "20%",
                  },
                  {
                    value: "0.25",
                    label: "25%",
                  },
                ]}
              />

              <Select
                label="Rotation"
                value={String(
                  values.watermark?.rotation ??
                    0
                )}
                onChange={(value) =>
                  nested(
                    "watermark",
                    "rotation",
                    Number(value)
                  )
                }
                options={[
                  {
                    value: "0",
                    label: "No Rotation",
                  },
                  {
                    value: "-10",
                    label: "-10°",
                  },
                  {
                    value: "-5",
                    label: "-5°",
                  },
                  {
                    value: "5",
                    label: "5°",
                  },
                  {
                    value: "10",
                    label: "10°",
                  },
                ]}
              />
            </div>
          )}

          {values.watermark?.enabled && (
            <Toggle
              label="Allow Watermark to Extend Outside Page"
              checked={
                values.watermark?.overflow
              }
              onChange={(checked) =>
                nested(
                  "watermark",
                  "overflow",
                  checked
                )
              }
            />
          )}
        </div>
      </Card>

      {/* ==========================================================
          TYPOGRAPHY
          ========================================================== */}

      <Card>
        <h3 className="mb-4 font-semibold">
          Typography
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Heading Font"
            value={
              values.typography.headingFont
            }
            onChange={(value) =>
              nested(
                "typography",
                "headingFont",
                value
              )
            }
            options={fonts.map(
              (value) => ({
                value,
                label: value,
              })
            )}
          />

          <Select
            label="Body Font"
            value={
              values.typography.bodyFont
            }
            onChange={(value) =>
              nested(
                "typography",
                "bodyFont",
                value
              )
            }
            options={fonts.map(
              (value) => ({
                value,
                label: value,
              })
            )}
          />

          <Select
            label="Document Title Size"
            value={
              values.typography
                .documentTitleSize
            }
            onChange={(value) =>
              nested(
                "typography",
                "documentTitleSize",
                value
              )
            }
            options={[
              20,
              22,
              24,
              26,
              28,
              30,
            ].map((value) => ({
              value: `${value}px`,
              label: `${value}px`,
            }))}
          />

          <Select
            label="Heading Size"
            value={
              values.typography.headingSize
            }
            onChange={(value) =>
              nested(
                "typography",
                "headingSize",
                value
              )
            }
            options={[
              12,
              14,
              16,
              18,
              20,
              24,
            ].map((value) => ({
              value: `${value}px`,
              label: `${value}px`,
            }))}
          />

          <Select
            label="Body Size"
            value={
              values.typography.bodySize
            }
            onChange={(value) =>
              nested(
                "typography",
                "bodySize",
                value
              )
            }
            options={[
              12,
              13,
              14,
              15,
              16,
            ].map((value) => ({
              value: `${value}px`,
              label: `${value}px`,
            }))}
          />

          <Select
            label="Table Text Size"
            value={
              values.typography
                .tableTextSize
            }
            onChange={(value) =>
              nested(
                "typography",
                "tableTextSize",
                value
              )
            }
            options={[
              11,
              12,
              13,
              14,
            ].map((value) => ({
              value: `${value}px`,
              label: `${value}px`,
            }))}
          />
        </div>
      </Card>

      {/* ==========================================================
          LAYOUT
          ========================================================== */}

      <Card>
        <h3 className="mb-4 font-semibold">
          Layout
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <Select
            label="Orientation"
            value={
              values.layout.orientation
            }
            onChange={(value) =>
              nested(
                "layout",
                "orientation",
                value
              )
            }
            options={[
              "portrait",
              "landscape",
            ].map((value) => ({
              value,
              label: value,
            }))}
          />

          <Select
            label="Page Size"
            value={
              values.layout.pageSize
            }
            onChange={(value) =>
              nested(
                "layout",
                "pageSize",
                value
              )
            }
            options={[
              "A4",
              "Letter",
              "Legal",
            ].map((value) => ({
              value,
              label: value,
            }))}
          />
        </div>

        <div className="mt-4">
          <ThemeSectionDesigner
            sectionOrder={
              values.layout.sectionOrder
            }
            sections={
              values.layout.sections
            }
            selectedSection={
              selectedSection
            }
            onSelect={
              setSelectedSection
            }
            onToggleVisibility={
              handleToggleVisibility
            }
            onReorder={
              handleReorder
            }
          />
        </div>
      </Card>

      {/* ==========================================================
          PRINT & PAGE SETTINGS
          ========================================================== */}

      <Card>
        <h3 className="mb-1 font-semibold">
          Print & Page Settings
        </h3>

        <p className="mb-5 text-sm text-slate-500">
          Control how the invoice is positioned,
          scaled and fitted when printed or
          exported to PDF.
        </p>

        <div className="space-y-6">

          {/* FITTING */}

          <section>
            <h4 className="mb-3 text-sm font-semibold text-slate-700">
              Page Fitting
            </h4>

            <div className="grid gap-4 sm:grid-cols-2">
              <Toggle
                label="Fit Invoice to One Page"
                checked={
                  values.layout?.print
                    ?.fitToOnePage
                }
                onChange={(checked) =>
                  updatePrintSetting(
                    "fitToOnePage",
                    checked
                  )
                }
              />

              <Toggle
                label="Compact Spacing"
                checked={
                  values.layout?.print
                    ?.compact
                }
                onChange={(checked) =>
                  updatePrintSetting(
                    "compact",
                    checked
                  )
                }
              />
            </div>

            <div className="mt-4">
              <Select
                label="Print Scale"
                value={String(
                  values.layout?.print
                    ?.scale ?? 100
                )}
                onChange={(value) =>
                  updatePrintSetting(
                    "scale",
                    Number(value)
                  )
                }
                options={[
                  {
                    value: "70",
                    label: "70%",
                  },
                  {
                    value: "75",
                    label: "75%",
                  },
                  {
                    value: "80",
                    label: "80%",
                  },
                  {
                    value: "85",
                    label: "85%",
                  },
                  {
                    value: "90",
                    label: "90%",
                  },
                  {
                    value: "95",
                    label: "95%",
                  },
                  {
                    value: "100",
                    label: "100%",
                  },
                ]}
              />
            </div>
          </section>

          {/* ALIGNMENT */}

          <section>
            <h4 className="mb-3 text-sm font-semibold text-slate-700">
              Page Alignment
            </h4>

            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Horizontal Alignment"
                value={
                  values.layout?.print
                    ?.horizontalAlignment ||
                  "left"
                }
                onChange={(value) =>
                  updatePrintSetting(
                    "horizontalAlignment",
                    value
                  )
                }
                options={[
                  {
                    value: "left",
                    label: "Left",
                  },
                  {
                    value: "center",
                    label: "Center",
                  },
                  {
                    value: "right",
                    label: "Right",
                  },
                ]}
              />

              <Select
                label="Vertical Alignment"
                value={
                  values.layout?.print
                    ?.verticalAlignment ||
                  "top"
                }
                onChange={(value) =>
                  updatePrintSetting(
                    "verticalAlignment",
                    value
                  )
                }
                options={[
                  {
                    value: "top",
                    label: "Top",
                  },
                  {
                    value: "center",
                    label: "Center",
                  },
                  {
                    value: "bottom",
                    label: "Bottom",
                  },
                ]}
              />
            </div>
          </section>

          {/* MARGINS */}

          <section>
            <h4 className="mb-3 text-sm font-semibold text-slate-700">
              Page Margins
            </h4>

            <p className="mb-4 text-xs text-slate-500">
              Set the distance between the
              printable page edge and the
              invoice content.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <NumberField
                label="Top"
                value={
                  values.layout?.print
                    ?.marginTop ??
                  values.layout?.marginTop ??
                  20
                }
                onChange={(value) =>
                  updatePrintSetting(
                    "marginTop",
                    value
                  )
                }
              />

              <NumberField
                label="Right"
                value={
                  values.layout?.print
                    ?.marginRight ??
                  values.layout?.marginRight ??
                  20
                }
                onChange={(value) =>
                  updatePrintSetting(
                    "marginRight",
                    value
                  )
                }
              />

              <NumberField
                label="Bottom"
                value={
                  values.layout?.print
                    ?.marginBottom ??
                  values.layout?.marginBottom ??
                  20
                }
                onChange={(value) =>
                  updatePrintSetting(
                    "marginBottom",
                    value
                  )
                }
              />

              <NumberField
                label="Left"
                value={
                  values.layout?.print
                    ?.marginLeft ??
                  values.layout?.marginLeft ??
                  20
                }
                onChange={(value) =>
                  updatePrintSetting(
                    "marginLeft",
                    value
                  )
                }
              />
            </div>
          </section>

          {/* CONTENT PADDING */}

          <section>
            <h4 className="mb-3 text-sm font-semibold text-slate-700">
              Invoice Content Padding
            </h4>

            <p className="mb-4 text-xs text-slate-500">
              Add internal space between the
              invoice boundary and its content.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <NumberField
                label="Top"
                value={
                  values.layout?.print
                    ?.paddingTop ?? 0
                }
                onChange={(value) =>
                  updatePrintSetting(
                    "paddingTop",
                    value
                  )
                }
              />

              <NumberField
                label="Right"
                value={
                  values.layout?.print
                    ?.paddingRight ?? 0
                }
                onChange={(value) =>
                  updatePrintSetting(
                    "paddingRight",
                    value
                  )
                }
              />

              <NumberField
                label="Bottom"
                value={
                  values.layout?.print
                    ?.paddingBottom ?? 0
                }
                onChange={(value) =>
                  updatePrintSetting(
                    "paddingBottom",
                    value
                  )
                }
              />

              <NumberField
                label="Left"
                value={
                  values.layout?.print
                    ?.paddingLeft ?? 0
                }
                onChange={(value) =>
                  updatePrintSetting(
                    "paddingLeft",
                    value
                  )
                }
              />
            </div>
          </section>

          {/* RESET */}

          <div className="flex justify-end border-t pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={
                resetPrintSettings
              }
            >
              Reset Print Settings
            </Button>
          </div>
        </div>
      </Card>

      {/* ==========================================================
          PAYMENT INFORMATION
          ========================================================== */}

      <Card>
        <h3 className="mb-1 font-semibold">
          Payment Information
        </h3>

        <p className="mb-5 text-sm text-slate-500">
          Control how payment information
          from the selected business appears
          on invoices.
        </p>

        <div className="space-y-4">
          <Toggle
            label="Show Payment Information"
            checked={
              values.payment
                ?.showPaymentInformation
            }
            onChange={(checked) =>
              nested(
                "payment",
                "showPaymentInformation",
                checked
              )
            }
          />

          <Toggle
            label="Show Bank Details"
            checked={
              values.payment
                ?.showBankDetails
            }
            onChange={(checked) =>
              nested(
                "payment",
                "showBankDetails",
                checked
              )
            }
          />

          <Toggle
            label="Show Payment Terms"
            checked={
              values.payment
                ?.showPaymentTerms
            }
            onChange={(checked) =>
              nested(
                "payment",
                "showPaymentTerms",
                checked
              )
            }
          />

          <Toggle
            label="Show Payment Status"
            checked={
              values.payment
                ?.showPaymentStatus
            }
            onChange={(checked) =>
              nested(
                "payment",
                "showPaymentStatus",
                checked
              )
            }
          />
        </div>

        {values.payment
          ?.showBankDetails && (
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-700">
              Business Bank Account
            </p>

            <p className="mt-1 text-xs text-slate-500">
              The invoice will automatically
              use the primary payment account
              configured on the selected
              Business.
            </p>

            {business?.paymentAccounts
              ?.length > 0 ? (
              <div className="mt-3 rounded-lg border bg-white p-3 text-sm">
                {(() => {
                  const account =
                    business.paymentAccounts.find(
                      (item) =>
                        item.isPrimary
                    ) ||
                    business.paymentAccounts[0];

                  return (
                    <>
                      <p className="font-medium text-slate-800">
                        {account.bankName}
                      </p>

                      <p className="text-slate-600">
                        {account.accountName}
                      </p>

                      <p className="text-slate-600">
                        {account.accountNumber}
                      </p>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                No payment account has
                been configured for this
                business.
              </div>
            )}
          </div>
        )}
      </Card>

      {/* ==========================================================
          PREVIEW
          ========================================================== */}

      <Card>
        <h3 className="mb-4 font-semibold">
          Preview
        </h3>

        <ThemePreview
          theme={values}
          business={business}
        />
      </Card>

      {/* ==========================================================
          ERROR
          ========================================================== */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ==========================================================
          ACTIONS
          ========================================================== */}

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Theme"}
        </Button>
      </div>
    </form>
  );
}

/*
|--------------------------------------------------------------------------
| Number Field
|--------------------------------------------------------------------------
*/

const NumberField = ({
  label,
  value,
  onChange,
}) => (
  <Field label={`${label} (mm)`}>
    <Input
      type="number"
      min="0"
      max="100"
      step="1"
      value={value}
      onChange={(event) =>
        onChange(
          Number(event.target.value)
        )
      }
    />
  </Field>
);

/*
|--------------------------------------------------------------------------
| Field
|--------------------------------------------------------------------------
*/

const Field = ({
  label,
  children,
}) => (
  <label className="block text-sm font-medium text-slate-700">
    {label}

    <div className="mt-1">
      {children}
    </div>
  </label>
);

/*
|--------------------------------------------------------------------------
| Toggle
|--------------------------------------------------------------------------
*/

const Toggle = ({
  label,
  checked,
  onChange,
}) => (
  <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
    <input
      type="checkbox"
      checked={Boolean(checked)}
      onChange={(event) =>
        onChange(
          event.target.checked
        )
      }
      className="h-4 w-4 rounded border-slate-300"
    />

    <span>{label}</span>
  </label>
);