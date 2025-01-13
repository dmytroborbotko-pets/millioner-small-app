import React from "react";
import styles from "./Button.module.css";
import Link from "next/link";
import { Url } from "url";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "small" | "medium" | "large";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

interface ButtonAsButtonProps extends ButtonBaseProps {
  href?: never;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string | Url;
  children: React.ReactNode;
  onClick?: never;
  type?: never;
  disabled?: never;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const getButtonClasses = (
  variant: ButtonVariant = "primary",
  size: ButtonSize = "large",
  fullWidth = true,
  className = ""
): string => {
  return [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    fullWidth && styles["button--full-width"],
    className,
  ]
    .filter(Boolean)
    .join(" ");
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "large",
  fullWidth = true,
  children,
  className = "",
  ...props
}) => {
  const buttonClasses = getButtonClasses(variant, size, fullWidth, className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonClasses}
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
};
