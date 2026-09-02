import BusinessIdentityBlock from "./BusinessIdentityBlock";
import DocumentTable from "./DocumentTable";
import DocumentTotals from "./DocumentTotals";

import {
  getDocumentThemeStyle,
} from "../utils/documentThemeStyles";

import {
  getSectionOrder,
  getSectionVisibility,
  normalizeTheme,
} from "../utils/themeHelpers";

export default function DocumentPreview({
  document,
  business = {},
  customer = {},
  theme,
  type = "invoice",
  printable = false,
}) {
  const resolvedTheme = normalizeTheme(theme);

  const {
    branding,
    table,
    totals,
    payment,
    footer,
  } = resolvedTheme;

  const sessions = document.sessions?.length
    ? document.sessions
    : [
        {
          id: "general",
          title: "General Items",
          items: document.items || [],
        },
      ];

  /*
  |--------------------------------------------------------------------------
  | Business Payment Account
  |--------------------------------------------------------------------------
  */

  const account =
    business.paymentAccounts?.find(
      (item) => item.isPrimary
    ) ||
    business.paymentAccounts?.[0];

  /*
  |--------------------------------------------------------------------------
  | Header
  |--------------------------------------------------------------------------
  */

  const header =
    resolvedTheme.header || {
      background: "primary",
      textColor: "#FFFFFF",
    };

  /*
  |--------------------------------------------------------------------------
  | Watermark
  |--------------------------------------------------------------------------
  */

  const watermark =
    resolvedTheme.watermark || {
      enabled: false,
      source: "businessLogo",
      size: "extraLarge",
      position: "center",
      opacity: 0.1,
      overflow: true,
      rotation: 0,
    };

  /*
  |--------------------------------------------------------------------------
  | Resolve Theme Colour
  |--------------------------------------------------------------------------
  */

  const resolveColor = (value) => {
    if (!value) {
      return (
        resolvedTheme.colors?.primary ||
        "#103746"
      );
    }

    if (value === "primary") {
      return (
        resolvedTheme.colors?.primary ||
        "#103746"
      );
    }

    if (value === "secondary") {
      return (
        resolvedTheme.colors?.secondary ||
        "#18566E"
      );
    }

    if (value === "accent") {
      return (
        resolvedTheme.colors?.accent ||
        "#D7B159"
      );
    }

    if (value === "surface") {
      return (
        resolvedTheme.colors?.surface ||
        "#F8FAFC"
      );
    }

    if (value === "background") {
      return (
        resolvedTheme.colors?.background ||
        "#FFFFFF"
      );
    }

    if (value === "transparent") {
      return "transparent";
    }

    return value;
  };

  const headerBackground = resolveColor(
    header.background
  );

  const headerTextColor = resolveColor(
    header.textColor
  );

  /*
  |--------------------------------------------------------------------------
  | Watermark Size
  |--------------------------------------------------------------------------
  */

  const watermarkSize =
    {
      small: "180px",
      medium: "280px",
      large: "420px",
      extraLarge: "560px",
    }[watermark.size] || "560px";

  /*
  |--------------------------------------------------------------------------
  | Watermark Position
  |--------------------------------------------------------------------------
  */

  const watermarkPosition =
    {
      center: {
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) rotate(${Number(
          watermark.rotation || 0
        )}deg)`,
      },

      topCenter: {
        top: "18%",
        left: "50%",
        transform: `translate(-50%, -50%) rotate(${Number(
          watermark.rotation || 0
        )}deg)`,
      },

      bottomCenter: {
        top: "82%",
        left: "50%",
        transform: `translate(-50%, -50%) rotate(${Number(
          watermark.rotation || 0
        )}deg)`,
      },
    }[watermark.position] || {
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%) rotate(${Number(
        watermark.rotation || 0
      )}deg)`,
    };

  /*
  |--------------------------------------------------------------------------
  | Business Logo
  |--------------------------------------------------------------------------
  */

  const businessLogo = business?.logo;

  /*
  |--------------------------------------------------------------------------
  | Should Show Watermark?
  |--------------------------------------------------------------------------
  */

  const showWatermark = Boolean(
    watermark.enabled &&
      businessLogo
  );

  /*
  |--------------------------------------------------------------------------
  | Document Information
  |--------------------------------------------------------------------------
  */

  const title =
    type === "quotation"
      ? "QUOTATION"
      : "INVOICE";

  const number =
    type === "quotation"
      ? document.quotationNumber
      : document.invoiceNumber;

  const dueDate =
    type === "quotation"
      ? document.expiryDate
      : document.dueDate;

  /*
  |--------------------------------------------------------------------------
  | Payment Schedule
  |--------------------------------------------------------------------------
  */

  const schedule =
    Array.isArray(
      document.paymentSchedule?.milestones
    ) &&
    document.paymentSchedule.milestones.length > 0
      ? document.paymentSchedule
      : null;

  /*
  |--------------------------------------------------------------------------
  | Render Sections
  |--------------------------------------------------------------------------
  */

  const render = (section) => {
    /*
     * ----------------------------------------------------------------------
     * BRANDING
     * ----------------------------------------------------------------------
     */

    if (section === "branding") {
      return (
        <header
          key={section}
          className="flex flex-wrap justify-between gap-6 rounded-lg border-b px-5 py-5"
          style={{
            backgroundColor: headerBackground,
            color: headerTextColor,
            borderColor:
              headerBackground === "transparent"
                ? "var(--document-border)"
                : headerBackground,
          }}
        >
          <div
            className="min-w-0 flex-1"
            style={{
              color: headerTextColor,
            }}
          >
            <BusinessIdentityBlock
              business={business}
              branding={branding}
            />
          </div>

          <div className="text-right">
            <h2
              style={{
                fontFamily:
                  "var(--document-heading-font)",
                fontSize:
                  "var(--document-title-size)",
                fontWeight:
                  "var(--document-heading-weight)",
                color: headerTextColor,
              }}
            >
              {title}
            </h2>

            <p
              style={{
                color: headerTextColor,
                fontWeight:
                  "var(--document-heading-weight)",
              }}
            >
              {number}
            </p>

            {(customer.companyName || customer.displayName) && (
              <p
                style={{
                  color: headerTextColor,
                  opacity: 0.85,
                  marginTop: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                For: {customer.companyName || customer.displayName}
              </p>
            )}
          </div>
        </header>
      );
    }
if (section === "customer") {
  return (
    <div
      key="customer-documentMeta"
      className="grid grid-cols-2 gap-8 py-4"
    >
      {/* LEFT — CUSTOMER DETAILS */}
      <section>
        <p
          style={{
            color: "var(--document-muted)",
            fontSize: "var(--document-small-size)",
          }}
        >
          BILL TO
        </p>

        {theme.customer?.showName !== false && (
          <div>
            <b>
              {customer.companyName || customer.displayName || "Customer"}
            </b>
            {customer.companyName && customer.displayName && customer.companyName !== customer.displayName && (
              <p
                style={{
                  color: "var(--document-muted)",
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                }}
              >
                {customer.displayName}
              </p>
            )}
          </div>
        )}

        {theme.customer?.showEmail !== false &&
          customer.email && (
            <p
              style={{
                color: "var(--document-muted)",
              }}
            >
              {customer.email}
            </p>
          )}

        {theme.customer?.showPhone !== false &&
          customer.phone && (
            <p
              style={{
                color: "var(--document-muted)",
              }}
            >
              {customer.phone}
            </p>
          )}

        {theme.customer?.showAddress !== false &&
          customer.address && (
            <p
              style={{
                color: "var(--document-muted)",
              }}
            >
              {customer.address}
            </p>
          )}
      </section>

      {/* RIGHT — DOCUMENT META */}
      <section
        className="text-right"
        style={{
          color: "var(--document-muted)",
          fontSize: "var(--document-medium-size)",
        }}
      >
        <div className="space-y-1">
          {document.issueDate && (
            <div>
              <span>Issued: </span>
              <span>{document.issueDate}</span>
            </div>
          )}

          {dueDate && (
            <div>
              <span>
                {type === "quotation"
                  ? "Valid until"
                  : "Due"}
                :{" "}
              </span>
              <span>{dueDate}</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

if (section === "documentMeta") {
  return null;
}

    /*
     /* ----------------------------------------------------------------------
 * SESSIONS
 * ---------------------------------------------------------------------- */

if (section === "sessions") {
  return (
    <div key={section}>
      <DocumentTable
        sessions={sessions}
        currency={document.currency}
        tableConfig={table}
      />
    </div>
  );
}

    /*
     * ----------------------------------------------------------------------
     * TOTALS
     * ----------------------------------------------------------------------
     */

    if (section === "totals") {
      return (
        <DocumentTotals
          key={section}
          totals={document}
          currency={document.currency}
          config={totals}
        />
      );
    }

    /*
     * ----------------------------------------------------------------------
     * PAYMENT
     * ----------------------------------------------------------------------
     */

    if (section === "payment") {
      const hasSchedule = Boolean(schedule);

      const hasTerms = Boolean(
        document.paymentTerms
      );

      const hasBankAccount = Boolean(
        payment.showBankDetails &&
          account
      );

      if (
        !payment.showPaymentInformation ||
        (!hasBankAccount &&
          !hasTerms &&
          !hasSchedule)
      ) {
        return null;
      }

      return (
        <section
          key={section}
          className="mt-6 text-sm"
          style={{
            color: "var(--document-muted)",
          }}
        >
          <div
            className="rounded-lg border p-3"
            style={{
              borderColor:
                "var(--document-border)",
            }}
          >
            <b
              style={{
                color:
                  "var(--document-primary)",
              }}
            >
              Payment details
            </b>

            {hasBankAccount && (
              <div className="mt-2">
                <div>
                  {account.bankName}
                </div>

                <div>
                  {account.accountName}
                  {" · "}
                  {account.accountNumber}
                </div>
              </div>
            )}

            {payment.showPaymentTerms &&
              hasTerms && (
                <div className="mt-2">
                  Terms:{" "}
                  {document.paymentTerms}
                </div>
              )}

            {payment.showPaymentTerms &&
              hasSchedule && (
                <div className="mt-3 space-y-2">
                  {schedule.milestones.map(
                    (milestone, index) => (
                      <div
                        key={
                          milestone.id ||
                          `${milestone.label}-${index}`
                        }
                        className="flex items-center justify-between gap-3"
                      >
                        <span>
                          {milestone.label}
                        </span>

                        <span>
                          {Number(
                            milestone.percentage || 0
                          )}
                          % ·{" "}
                          {new Intl.NumberFormat(
                            "en-NG",
                            {
                              style: "currency",
                              currency:
                                document.currency ||
                                "NGN",
                              maximumFractionDigits: 0,
                            }
                          ).format(
                            (Number(
                              document.grandTotal || 0
                            ) *
                              Number(
                                milestone.percentage ||
                                  0
                              )) /
                              100
                          )}
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}
          </div>
        </section>
      );
    }

    /*
     * ----------------------------------------------------------------------
     * NOTES
     * ----------------------------------------------------------------------
     */

    if (section === "notes") {
      if (
        !document.notes &&
        !document.terms
      ) {
        return null;
      }

      return (
        <section
          key={section}
          className="mt-6 text-sm"
          style={{
            color: "var(--document-muted)",
          }}
        >
          {document.notes && (
            <>
              <b
                style={{
                  color:
                    "var(--document-primary)",
                }}
              >
                Notes
              </b>

              <p className="mt-2 whitespace-pre-wrap">
                {document.notes}
              </p>
            </>
          )}

          {document.terms && (
            <>
              <b
                className="mt-4 block"
                style={{
                  color:
                    "var(--document-primary)",
                }}
              >
                Terms & Conditions
              </b>

              <p className="mt-2 whitespace-pre-wrap">
                {document.terms}
              </p>
            </>
          )}
        </section>
      );
    }

    /*
     * ----------------------------------------------------------------------
     * FOOTER
     * ----------------------------------------------------------------------
     */

    if (section === "footer") {
      if (!footer.showFooter) {
        return null;
      }

      return (
        <footer
          key={section}
          className="mt-8 border-t pt-4 text-center text-xs"
          style={{
            borderColor:
              "var(--document-border)",
            color:
              "var(--document-muted)",
          }}
        >
          {footer.footerText}
        </footer>
      );
    }

    return null;
  };

  /*
  |--------------------------------------------------------------------------
  | Active Sections
  |--------------------------------------------------------------------------
  */

  const active = getSectionOrder(
    resolvedTheme
  ).filter(
    (id) =>
      getSectionVisibility(
        resolvedTheme
      )[id]?.visible !== false
  );

  /*
  |--------------------------------------------------------------------------
  | Final Document
  |--------------------------------------------------------------------------
  */

  return (
    <>
      {/* ================================================================
          PRINT ISOLATION

          This does NOT affect the normal screen view.

          During printing:
          - Hide the ERP application
          - Show only this invoice
          - Remove browser/app surrounding layout
          - Keep the existing invoice design
          ================================================================ */}

      {printable && (
        <style>
          {`
            @media print {
              @page {
                margin: 0;
              }

              html,
              body {
                margin: 0 !important;
                padding: 0 !important;
                background: #ffffff !important;
              }

              body * {
                visibility: hidden !important;
              }

              .businesshub-print-document,
              .businesshub-print-document * {
                visibility: visible !important;
              }

              .businesshub-print-document {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 210mm !important;
                max-width: 210mm !important;
                min-height: 0 !important;
                margin: 0 !important;
                padding: 15mm !important;
                border: none !important;
                border-radius: 0 !important;
                box-shadow: none !important;
                overflow: visible !important;
                background: var(--document-background, #ffffff) !important;
              }

              .businesshub-print-document img {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }

              .businesshub-print-document,
              .businesshub-print-document * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          `}
        </style>
      )}

      <div
        className={`businesshub-print-document relative isolate mx-auto max-w-[210mm] overflow-visible ${
          printable
            ? "p-8 shadow-sm print:max-w-none print:p-0 print:shadow-none"
            : "rounded-xl border p-6"
        }`}
        style={{
          ...getDocumentThemeStyle(
            resolvedTheme
          ),
          borderColor:
            "var(--document-border)",
          backgroundColor:
            "var(--document-background)",
          color:
            "var(--document-text)",
        }}
      >
        {/* ================================================================
            BUSINESS LOGO WATERMARK
            ================================================================ */}

        {showWatermark && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-0"
            style={{
              top:
                watermarkPosition.top,

              left:
                watermarkPosition.left,

              transform:
                watermarkPosition.transform,

              width:
                watermarkSize,

              height:
                watermarkSize,

              opacity:
                Number(
                  watermark.opacity ?? 0.1
                ),

              overflow: "visible",

              ...(watermark.overflow
                ? {
                    maxWidth: "none",
                    maxHeight: "none",
                  }
                : {}),

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={businessLogo}
              alt=""
              draggable="false"
              className="block h-full w-full object-contain"
            />
          </div>
        )}

        {/* ================================================================
            DOCUMENT CONTENT
            ================================================================ */}

        <div className="relative z-10">
          {active.map(render)}
        </div>
      </div>
    </>
  );
}