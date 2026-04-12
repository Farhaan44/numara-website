"use client"

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface FilterTabsProps {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
}

export function FilterTabs({ options, value, onChange }: FilterTabsProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
      {options.map((option) => {
        const isActive = value === option.value
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            style={{
              position: "relative",
              cursor: "pointer",
              padding: "8px 16px",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              border: "none",
              background: isActive ? "#412c17" : "transparent",
              color: isActive ? "#F8F0E5" : "rgba(65,44,23,0.5)",
              transition: "background 0.25s, color 0.25s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "#412c17"
            }}
            onMouseLeave={(e) => {
              if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(65,44,23,0.5)"
            }}
          >
            {option.label}
            {option.count !== undefined && (
              <span
                style={{
                  marginLeft: "6px",
                  fontSize: "9px",
                  color: isActive ? "#c2a170" : "rgba(65,44,23,0.35)",
                }}
              >
                ({option.count})
              </span>
            )}
            {isActive && (
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: "#c2a170",
                }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}