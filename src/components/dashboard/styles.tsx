import styled from "styled-components";
import { Category } from "../../modules/dashboard/types";

export const GREEN = "#003B36";
export const GRAY = "#BFC0C0";
export const CARD_BG = "#0A4A44";

export const CATEGORY_COLORS: Record<Category, string> = {
  work: "#7FB3D5",
  personal: "#D7BDE2",
  home: "#F5CBA7"
};

export const PageWrap = styled.div`
  min-height: 100vh;
  background-color: ${GREEN};
  color: ${GRAY};
  font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 24px 16px 80px;
  box-sizing: border-box;
`;

export const Inner = styled.div`
  max-width: 880px;
  margin: 0 auto;
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
`;

export const DateLabel = styled.span`
  font-size: 15px;
  color: ${GRAY};
  opacity: 0.85;
`;

export const JumpNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 16px;
`;

export const JumpLink = styled.a`
  color: ${GRAY};
  text-decoration: none;
  font-size: 13px;
  border: 1px solid rgba(191, 192, 192, 0.4);
  border-radius: 999px;
  padding: 4px 12px;

  &:hover {
    border-color: ${GRAY};
  }
`;

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 0 0 28px;
`;

export const FilterLabel = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.6;
  margin-right: 4px;
`;

export const Card = styled.section`
  background-color: ${CARD_BG};
  border-radius: 12px;
  padding: 20px 22px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 4px;
  color: #ffffff;
`;

export const CardSubtitle = styled.p`
  font-size: 13px;
  margin: 0 0 16px;
  color: ${GRAY};
  opacity: 0.8;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(191, 192, 192, 0.15);

  &:last-child {
    border-bottom: none;
  }
`;

export const SubRow = styled(Row)`
  padding-left: 26px;
  border-bottom: 1px solid rgba(191, 192, 192, 0.08);
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  accent-color: ${GRAY};
  cursor: pointer;
`;

export const RowLabel = styled.span<{ $done?: boolean }>`
  flex: 1;
  font-size: 15px;
  text-decoration: ${(p) => (p.$done ? "line-through" : "none")};
  opacity: ${(p) => (p.$done ? 0.55 : 1)};
`;

export const Badge = styled.span<{ $category: Category }>`
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 2px 8px;
  border-radius: 999px;
  color: ${GREEN};
  background-color: ${(p) => CATEGORY_COLORS[p.$category]};
  flex-shrink: 0;
  white-space: nowrap;
`;

export type TagTone = "due" | "overdue" | "optional" | "done";

export const Tag = styled.span<{ $tone?: TagTone }>`
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  flex-shrink: 0;
  white-space: nowrap;
  border: 1px solid rgba(191, 192, 192, 0.4);
  color: ${GRAY};
  ${(p) => p.$tone === "overdue" && `border-color: #E74C3C; color: #E74C3C;`}
  ${(p) => p.$tone === "due" && `border-color: #F4D03F; color: #F4D03F;`}
  ${(p) => p.$tone === "optional" && `opacity: 0.7;`}
  ${(p) => p.$tone === "done" && `border-color: #58D68D; color: #58D68D;`}
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  color: ${GRAY};
  opacity: 0.6;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 4px 6px;

  &:hover {
    opacity: 1;
    color: #e74c3c;
  }
`;

export const AddRow = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
`;

export const SubAddRow = styled(AddRow)`
  margin-top: 10px;
  padding-left: 26px;
`;

export const TextInput = styled.input`
  flex: 1;
  min-width: 160px;
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(191, 192, 192, 0.3);
  border-radius: 6px;
  padding: 8px 10px;
  color: #ffffff;
  font-size: 14px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${GRAY};
  }

  &::placeholder {
    color: rgba(191, 192, 192, 0.5);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(191, 192, 192, 0.3);
  border-radius: 6px;
  padding: 10px;
  color: #ffffff;
  font-size: 14px;
  font-family: inherit;
  box-sizing: border-box;
  resize: vertical;
  margin-top: 8px;

  &:focus {
    outline: none;
    border-color: ${GRAY};
  }
`;

export const Select = styled.select`
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(191, 192, 192, 0.3);
  border-radius: 6px;
  padding: 8px 10px;
  color: #ffffff;
  font-size: 14px;
  font-family: inherit;
`;

export const PrimaryButton = styled.button`
  background-color: ${GRAY};
  color: ${GREEN};
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const GhostButton = styled.button`
  background: transparent;
  color: ${GRAY};
  border: 1px solid rgba(191, 192, 192, 0.4);
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    border-color: ${GRAY};
  }
`;

export const TabBar = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 4px;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  background: ${(p) => (p.$active ? GRAY : "transparent")};
  color: ${(p) => (p.$active ? GREEN : GRAY)};
  border: 1px solid rgba(191, 192, 192, 0.4);
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 13px;
  cursor: pointer;
`;

export const EmptyState = styled.p`
  font-size: 14px;
  color: ${GRAY};
  opacity: 0.6;
  font-style: italic;
  margin: 6px 0 0;
`;

export const LockScreenWrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${GREEN};
  font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 24px;
  box-sizing: border-box;
`;

export const LockCard = styled.form`
  background-color: ${CARD_BG};
  border-radius: 12px;
  padding: 32px 28px;
  width: 100%;
  max-width: 340px;
  text-align: center;
`;

export const LockTitle = styled.h1`
  font-size: 20px;
  color: #ffffff;
  margin: 0 0 6px;
`;

export const LockSubtitle = styled.p`
  font-size: 13px;
  color: ${GRAY};
  opacity: 0.8;
  margin: 0 0 20px;
`;

export const LockInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(191, 192, 192, 0.3);
  border-radius: 6px;
  padding: 10px 12px;
  color: #ffffff;
  font-size: 15px;
  font-family: inherit;
  text-align: center;
  margin-bottom: 12px;

  &:focus {
    outline: none;
    border-color: ${GRAY};
  }
`;

export const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 13px;
  margin: -4px 0 12px;
`;
