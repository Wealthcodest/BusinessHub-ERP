import { Fragment } from "react";

const padding = {
  compact: "p-1.5",
  normal: "p-3",
  comfortable: "p-4",
};

const alignment = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default function DocumentTable({
  items = [],
  sessions = [],
  currency,
  tableConfig,
}) {
  const visible = Object.entries(
    tableConfig.columnVisibility
  )
    .filter(([, enabled]) => enabled)
    .map(([key]) => key);

  const money = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency || "NGN",
    }).format(Number(value || 0));

  const border = tableConfig.showBorders ? "border" : "";

  const cellClass = (key) =>
    `${padding[tableConfig.cellPadding]} ${
      alignment[tableConfig.alignment[key]]
    }`;

  return (
    <table
      className={`w-full ${border}`}
      style={{
        fontSize: "var(--document-table-size)",
        borderColor: "var(--document-border)",
      }}
    >
      {/* TABLE HEADER */}
      {tableConfig.showHeader && (
        <thead>
          <tr
            style={{
              backgroundColor:
                "var(--document-table-header)",
              color:
                "var(--document-table-header-text)",
            }}
          >
            {visible.map((key) => (
              <th
                key={key}
                className={cellClass(key)}
              >
                {tableConfig.columnLabels[key]}
              </th>
            ))}
          </tr>
        </thead>
      )}

      <tbody>
        {sessions.length > 0
          ? sessions.map((session, sessionIndex) => {
              const sessionItems = session.items || [];

              const subtotal =
                session.subtotal ??
                sessionItems.reduce(
                  (total, item) =>
                    total + Number(item.lineTotal || 0),
                  0
                );

              return (
                <Fragment
                  key={
                    session.id ||
                    `session-${sessionIndex}`
                  }
                >
                  {/* SESSION TITLE */}
                  <tr
                    style={{
                      backgroundColor:
                        "var(--document-surface)",
                      borderTop:
                        "1px solid var(--document-border)",
                      borderBottom:
                        "1px solid var(--document-border)",
                    }}
                  >
                    <td
                      colSpan={visible.length}
                      className="px-3 py-3"
                    >
                      <div
                        style={{
                          color:
                            "var(--document-session-title)",
                          fontSize:
                            "var(--document-heading-size)",
                          fontFamily:
                            "var(--document-heading-font)",
                          fontWeight:
                            "var(--document-heading-weight)",
                        }}
                      >
                        {session.title}
                      </div>

                      {session.description && (
                        <div
                          className="mt-1"
                          style={{
                            color:
                              "var(--document-muted)",
                          }}
                        >
                          {session.description}
                        </div>
                      )}
                    </td>
                  </tr>

                  {/* SESSION ITEMS */}
                  {sessionItems.map(
                    (item, itemIndex) => (
                      <tr
                        key={
                          item.id ||
                          `${session.id}-item-${itemIndex}`
                        }
                        className={
                          tableConfig.alternateRows &&
                          itemIndex % 2
                            ? "bg-slate-50"
                            : ""
                        }
                        style={
                          tableConfig.showRowBorders
                            ? {
                                borderBottom:
                                  "1px solid var(--document-border)",
                              }
                            : undefined
                        }
                      >
                        {visible.map((key) => (
                          <td
                            key={key}
                            className={cellClass(key)}
                          >
                            {key === "description"
                              ? item.description
                              : key === "quantity"
                              ? item.quantity
                              : key === "unitPrice"
                              ? money(item.unitPrice)
                              : money(item.lineTotal)}
                          </td>
                        ))}
                      </tr>
                    )
                  )}

                  {/* SESSION SUBTOTAL */}
                  <tr
                    style={
                      tableConfig.showRowBorders
                        ? {
                            borderBottom:
                              "1px solid var(--document-border)",
                          }
                        : undefined
                    }
                  >
                    <td
                      colSpan={Math.max(
                        visible.length - 1,
                        1
                      )}
                      className={`${padding[tableConfig.cellPadding]} text-right font-semibold`}
                    >
                      {session.title
                        ? `${session.title} Subtotal`
                        : "Subtotal"}
                    </td>

                    <td
                      className={`${padding[tableConfig.cellPadding]} text-right font-semibold`}
                    >
                      {money(subtotal)}
                    </td>
                  </tr>
                </Fragment>
              );
            })
          : items.map((item, index) => (
              <tr
                key={
                  item.id ||
                  `item-${index}`
                }
                style={
                  tableConfig.showRowBorders
                    ? {
                        borderBottom:
                          "1px solid var(--document-border)",
                      }
                    : undefined
                }
              >
                {visible.map((key) => (
                  <td
                    key={key}
                    className={cellClass(key)}
                  >
                    {key === "description"
                      ? item.description
                      : key === "quantity"
                      ? item.quantity
                      : key === "unitPrice"
                      ? money(item.unitPrice)
                      : money(item.lineTotal)}
                  </td>
                ))}
              </tr>
            ))}
      </tbody>
    </table>
  );
}