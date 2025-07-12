import css from "../../../../components/SidebarNotes/SidebarNotes.module.css";
import Link from "next/link";

const allTag: string[] = [
  "All",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

const SideBarNotes = async () => {
  return (
    <ul className={css.menuList}>
      {allTag.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SideBarNotes;
