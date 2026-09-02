export const defaultThemeValues = {
  name: "Ovixa Professional",

  primaryColor: "#103746",
  secondaryColor: "#18566E",
  accentColor: "#D7B159",

  fontFamily: "Inter",
  headingFont: "Inter",
  bodyFont: "Inter",

  headerStyle: "classic",
  footerStyle: "classic",
  tableStyle: "professional",

  

branding: {
  logoPosition: "left",
  logoSize: "medium",
  showLogo: true,

  logo: {
    container: {
      enabled: true,

      background: "#FFFFFF",

      width: "auto",
      height: "auto",

      paddingTop: 8,
      paddingRight: 12,
      paddingBottom: 8,
      paddingLeft: 12,

      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,

      borderEnabled: false,
      borderColor: "#D1D5DB",
      borderWidth: 1,
      borderRadius: 0,

      shadowEnabled: false,
    },
  },
},

  /*
  |--------------------------------------------------------------------------
  | Header
  |--------------------------------------------------------------------------
  */

  header: {
    background: "primary",
    textColor: "#FFFFFF",
  },

  /*
  |--------------------------------------------------------------------------
  | Watermark
  |--------------------------------------------------------------------------
  */

  watermark: {
    enabled: false,

    /*
     * Uses the selected business logo automatically.
     */
    source: "businessLogo",

    /*
     * small | medium | large | extraLarge
     */
    size: "extraLarge",

    /*
     * center | topCenter | bottomCenter
     */
    position: "center",

    /*
     * Percentage.
     */
    opacity: 0.10,

    /*
     * Allows the logo to extend beyond the document boundary.
     */
    overflow: true,

    /*
     * Optional rotation.
     */
    rotation: 0,
  },

  /*
  |--------------------------------------------------------------------------
  | Legacy watermark fields
  |--------------------------------------------------------------------------
  |
  | Kept for compatibility with existing themes.
  |
  */

  showWatermark: false,
  watermarkText: "",
  watermarkOpacity: 0.12,

  pageSize: "A4",
  orientation: "portrait",
  pageMargin: "normal",

  showPreparedBy: true,
  showApprovedBy: false,
  showCustomerSignature: true,
  showCompanyStamp: false,

  /*
  |--------------------------------------------------------------------------
  | Branding
  |--------------------------------------------------------------------------
  */

  branding: {
    showLogo: true,
    logoPosition: "left",
    logoSize: "medium",
    customLogoSize: 90,
    logoShape: "original",

    showBusinessName: true,
    showBusinessTagline: false,

    showBusinessAddress: true,
    showBusinessPhone: true,
    showBusinessEmail: true,
    showBusinessWebsite: true,

    showRegistrationNumber: false,
    showTaxNumber: false,

    showBusinessLogoBackground: false,
    logoBackgroundColor: "#FFFFFF",
  },

  /*
  |--------------------------------------------------------------------------
  | Colours
  |--------------------------------------------------------------------------
  */

  colors: {
    primary: "#103746",
    secondary: "#18566E",
    accent: "#D7B159",

    background: "#FFFFFF",
    surface: "#F8FAFC",

    text: "#1E293B",
    mutedText: "#64748B",
    border: "#E2E8F0",

    tableHeaderBackground: "#103746",
    tableHeaderText: "#FFFFFF",

    totalBackground: "#F1F5F9",
    totalText: "#103746",
  },

  /*
  |--------------------------------------------------------------------------
  | Typography
  |--------------------------------------------------------------------------
  */

  typography: {
    headingFont: "Inter",
    bodyFont: "Inter",

    documentTitleSize: "24px",
    headingSize: "16px",
    bodySize: "14px",
    tableTextSize: "13px",
    smallTextSize: "11px",

    headingWeight: "700",
    bodyWeight: "400",
  },

  /*
  |--------------------------------------------------------------------------
  | Layout
  |--------------------------------------------------------------------------
  */

  layout: {
    pageSize: "A4",
    orientation: "portrait",

    /*
     * Base document margins.
     *
     * Values are in millimetres.
     */
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,

    headerStyle: "classic",
    headerSpacing: "normal",
    contentSpacing: "normal",
    sectionSpacing: "normal",

    footerStyle: "simple",

    /*
     |--------------------------------------------------------------------------
     | Print Settings
     |--------------------------------------------------------------------------
     |
     | These settings control the actual printable document.
     |
     */

    print: {
      /*
       * Inner padding of the printable invoice content.
       * Value is in millimetres.
       */
      padding: 8,

      /*
       * Horizontal positioning.
       *
       * left
       * center
       * right
       */
      horizontalAlignment: "center",

      /*
       * Vertical positioning.
       *
       * top
       * center
       * bottom
       */
      verticalAlignment: "top",

      /*
       * Print scale.
       *
       * 100 = normal size
       * 90 = slightly smaller
       * 80 = smaller
       */
      scale: 100,

      /*
       * Attempt to fit the complete invoice
       * onto a single printed page.
       */
      fitToOnePage: false,

      /*
       * Preserve invoice background colours
       * when printing.
       */
      printBackgrounds: true,

      /*
       * Keep individual document sections together
       * where possible when printing.
       */
      keepSectionsTogether: true,
    },

    /*
     |--------------------------------------------------------------------------
     | Document Sections
     |--------------------------------------------------------------------------
     */

    sectionOrder: [
      "branding",
      "documentMeta",
      "customer",
      "sessions",
      "totals",
      "payment",
      "notes",
      "footer",
    ],

    sections: {
      branding: { visible: true },
      documentMeta: { visible: true },
      customer: { visible: true },
      sessions: { visible: true }, 
      totals: { visible: true },
      payment: { visible: true },
      notes: { visible: true },
      footer: { visible: true },
    },
  },

  /*
  |--------------------------------------------------------------------------
  | Table
  |--------------------------------------------------------------------------
  */

  table: {
    style: "professional",

    showHeader: true,
    showBorders: false,
    showRowBorders: true,
    alternateRows: false,

    columnVisibility: {
      description: true,
      quantity: true,
      unitPrice: true,
      amount: true,
    },

    columnLabels: {
      description: "Description",
      quantity: "Qty",
      unitPrice: "Unit Price",
      amount: "Amount",
    },

    alignment: {
      description: "left",
      quantity: "right",
      unitPrice: "right",
      amount: "right",
    },

    cellPadding: "normal",
  },

  /*
  |--------------------------------------------------------------------------
  | Sessions
  |--------------------------------------------------------------------------
  */

  session: {
    showSessionHeader: true,
    showSessionSubtotal: true,
    headerStyle: "filled",
    subtotalStyle: "simple",
    spacing: "normal",
    titleColor: "#D7B159",
  // keep your existing session properties
  },

  /*
  |--------------------------------------------------------------------------
  | Totals
  |--------------------------------------------------------------------------
  */

  totals: {
    style: "simple",
    showSubtotal: true,
    showDiscount: true,
    showTax: true,
    showGrandTotal: true,
    grandTotalEmphasis: "emphasized",
  },

  /*
  |--------------------------------------------------------------------------
  | Payment
  |--------------------------------------------------------------------------
  */

  payment: {
    showPaymentInformation: true,
    showBankDetails: false,
    showPaymentTerms: true,
    showPaymentStatus: true,
  },

  /*
  |--------------------------------------------------------------------------
  | Footer
  |--------------------------------------------------------------------------
  */

  footer: {
    showFooter: true,
    showNotes: true,
    showTerms: true,
    showSignature: true,
    signatureLines: 2,
    footerText: "Thank you for your business.",
  },

    /*
  |--------------------------------------------------------------------------
  | Print Area
  |--------------------------------------------------------------------------
  */

    print: {
    paperSize: "A4",
    orientation: "portrait",

    margins: {
      top: 15,
      right: 15,
      bottom: 15,
      left: 15,
    },

    pageBreakBefore: "auto",

    keepSessionTogether: true,
    repeatTableHeader: true,
  },
};


/*
|--------------------------------------------------------------------------
| Create Default Theme
|--------------------------------------------------------------------------
*/

export const createDefaultTheme = (businessId) => ({
  ...defaultThemeValues,

  id: `theme-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`,

  businessId,

  isDefault: true,

  /*
   |--------------------------------------------------------------------------
   | Header
   |--------------------------------------------------------------------------
   */

  header: {
    ...defaultThemeValues.header,
  },

  /*
   |--------------------------------------------------------------------------
   | Watermark
   |--------------------------------------------------------------------------
   */

  watermark: {
    ...defaultThemeValues.watermark,
  },

  /*
   |--------------------------------------------------------------------------
   | Branding
   |--------------------------------------------------------------------------
   */

  branding: {
    ...defaultThemeValues.branding,
  },

  /*
   |--------------------------------------------------------------------------
   | Colours
   |--------------------------------------------------------------------------
   */

  colors: {
    ...defaultThemeValues.colors,
  },

  /*
   |--------------------------------------------------------------------------
   | Typography
   |--------------------------------------------------------------------------
   */

  typography: {
    ...defaultThemeValues.typography,
  },

  /*
   |--------------------------------------------------------------------------
   | Layout
   |--------------------------------------------------------------------------
   */

  layout: {
    ...defaultThemeValues.layout,

    /*
     * Copy print settings so they are independent
     * for each theme.
     */
    print: {
      ...defaultThemeValues.layout.print,
    },

    sectionOrder: [
      ...defaultThemeValues.layout.sectionOrder,
    ],

    sections: Object.fromEntries(
      Object.entries(
        defaultThemeValues.layout.sections
      ).map(([key, value]) => [
        key,
        { ...value },
      ])
    ),
  },

  /*
   |--------------------------------------------------------------------------
   | Table
   |--------------------------------------------------------------------------
   */

  table: {
    ...defaultThemeValues.table,

    columnVisibility: {
      ...defaultThemeValues.table.columnVisibility,
    },

    columnLabels: {
      ...defaultThemeValues.table.columnLabels,
    },

    alignment: {
      ...defaultThemeValues.table.alignment,
    },
  },

  /*
   |--------------------------------------------------------------------------
   | Session
   |--------------------------------------------------------------------------
   */

  session: {
    ...defaultThemeValues.session,
  },

  /*
   |--------------------------------------------------------------------------
   | Totals
   |--------------------------------------------------------------------------
   */

  totals: {
    ...defaultThemeValues.totals,
  },

  /*
   |--------------------------------------------------------------------------
   | Payment
   |--------------------------------------------------------------------------
   */

  payment: {
    ...defaultThemeValues.payment,
  },

  /*
   |--------------------------------------------------------------------------
   | Footer
   |--------------------------------------------------------------------------
   */

  footer: {
    ...defaultThemeValues.footer,
  },

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
