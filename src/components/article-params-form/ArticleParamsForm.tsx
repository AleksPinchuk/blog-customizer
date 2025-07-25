import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { useState, useRef, useEffect } from 'react';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentState: typeof defaultArticleState;
	onApply: (state: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({
	currentState,
	onApply,
}: ArticleParamsFormProps) => {
	const [selectedFont, setSelectedFont] = useState(
		currentState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		currentState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		currentState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		currentState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		currentState.contentWidth
	);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const asideRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isMenuOpen) return;
		const handleClick = (event: MouseEvent) => {
			const target = event.target as Node;
			if (asideRef.current && !asideRef.current.contains(target)) {
				setIsMenuOpen(false);
			}
		};
		window.addEventListener('mousedown', handleClick);
		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isMenuOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen((prev) => !prev)}
			/>
			{isMenuOpen && (
				<aside
					ref={asideRef}
					className={styles.container + ' ' + styles.container_open}>
					<form
						className={styles.form}
						onSubmit={(e) => {
							e.preventDefault();
							onApply({
								fontFamilyOption: selectedFont,
								fontSizeOption: selectedFontSize,
								fontColor: selectedFontColor,
								backgroundColor: selectedBackgroundColor,
								contentWidth: selectedContentWidth,
							});
						}}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={selectedFont}
							onChange={setSelectedFont}
							placeholder='Выберите шрифт'
						/>
						<RadioGroup
							title='Размер шрифта'
							name='fontSize'
							options={fontSizeOptions}
							selected={selectedFontSize}
							onChange={setSelectedFontSize}
						/>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={selectedFontColor}
							onChange={setSelectedFontColor}
							placeholder='Выберите цвет шрифта'
						/>
						<Separator></Separator>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={selectedBackgroundColor}
							onChange={setSelectedBackgroundColor}
							placeholder='Выберите цвет фона'
						/>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={selectedContentWidth}
							onChange={setSelectedContentWidth}
							placeholder='Выберите ширину контента'
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='button'
								type='clear'
								onClick={() => {
									setSelectedFont(defaultArticleState.fontFamilyOption);
									setSelectedFontSize(defaultArticleState.fontSizeOption);
									setSelectedFontColor(defaultArticleState.fontColor);
									setSelectedBackgroundColor(
										defaultArticleState.backgroundColor
									);
									setSelectedContentWidth(defaultArticleState.contentWidth);
								}}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
