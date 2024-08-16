import { ReactNode } from "react";

interface Props {
  term: string;
  children: ReactNode;
}

const DefinitionItem = ({ term, children }: Props) => {
  return (
    <dl className="movie-details-border flex">
      <dt>{term}</dt>
      <dd>{children}</dd>
    </dl>
  );
};

export default DefinitionItem;
