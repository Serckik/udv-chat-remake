import EmojiPicker, { Categories, EmojiClickData } from 'emoji-picker-react';
import styled from "@emotion/styled";

const StyledEmoji = styled(EmojiPicker)`
    position: absolute !important;
    left: 50%;
    top: -385%;
`;

type EmojiProps = {
    onClick: (evt: EmojiClickData) => void
    show: boolean
}

function Emoji({ onClick, show }: EmojiProps) {
    return (
        <StyledEmoji
            onEmojiClick={(evt) => onClick(evt)}
            searchDisabled
            skinTonesDisabled
            previewConfig={{
                showPreview: false
            }}
            open={show}
            categories={[
                {
                    name: "Недавние",
                    category: Categories.SUGGESTED
                },
                {
                    name: "Эмоции, Жесты, Люди",
                    category: Categories.SMILEYS_PEOPLE
                },
                {
                    name: "Животные, Растения",
                    category: Categories.ANIMALS_NATURE
                },
                {
                    name: "Еда, Напитки",
                    category: Categories.FOOD_DRINK
                },
                {
                    name: "Путешествия, Транспорт",
                    category: Categories.TRAVEL_PLACES
                },
                {
                    name: "Спорт, Активности",
                    category: Categories.ACTIVITIES
                },
                {
                    name: "Предметы",
                    category: Categories.OBJECTS
                },
                {
                    name: "Cимволы",
                    category: Categories.SYMBOLS
                },
                {
                    name: "Флаги",
                    category: Categories.FLAGS
                },
            ]}

        />
    )
}

export default Emoji